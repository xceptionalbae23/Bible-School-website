import requests
import sys
import json
import io
from datetime import datetime

class WHIBCAPITester:
    def __init__(self, base_url="https://whibc-portal.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_token = None
        self.uploaded_image_filename = None
        self.graduation_image_filename = None

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None, auth_required=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {}
        
        # Add authorization header if required
        if auth_required and self.admin_token:
            headers['Authorization'] = f'Bearer {self.admin_token}'
        
        # Don't set Content-Type for multipart/form-data (files)
        if not files:
            headers['Content-Type'] = 'application/json'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            response = None
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=15)
            elif method == 'POST':
                if files:
                    # For form data with files
                    response = requests.post(url, data=data, files=files, timeout=15)
                else:
                    # For JSON data
                    response = requests.post(url, json=data, headers=headers, timeout=15)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=15)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"Response Text: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:500]}...")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )

    def test_admin_login_valid(self):
        """Test admin login with valid credentials"""
        login_data = {
            "username": "admin",
            "password": "whibc2025"
        }
        
        success, response = self.run_test(
            "Admin Login (Valid Credentials)",
            "POST",
            "api/admin/login",
            200,
            data=login_data
        )
        
        if success and response:
            self.admin_token = response.get('access_token')
            print(f"✅ Admin token obtained: {self.admin_token[:20]}...")
            print(f"Token type: {response.get('token_type')}")
            print(f"Expires in: {response.get('expires_in')} seconds")
            admin_info = response.get('admin_info', {})
            print(f"Admin username: {admin_info.get('username')}")
            print(f"Admin role: {admin_info.get('role')}")
        
        return success

    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        login_data = {
            "username": "admin",
            "password": "wrongpassword"
        }
        
        return self.run_test(
            "Admin Login (Invalid Credentials)",
            "POST",
            "api/admin/login",
            401,  # Unauthorized expected
            data=login_data
        )

    def test_admin_login_superadmin(self):
        """Test superadmin login"""
        login_data = {
            "username": "superadmin",
            "password": "whibc@admin2025"
        }
        
        return self.run_test(
            "Superadmin Login",
            "POST",
            "api/admin/login",
            200,
            data=login_data
        )

    def test_verify_admin_token(self):
        """Test token verification endpoint"""
        if not self.admin_token:
            print("❌ No admin token available for verification test")
            return False
            
        return self.run_test(
            "Verify Admin Token",
            "POST",
            "api/admin/verify-token",
            200,
            auth_required=True
        )

    def test_student_registration(self):
        """Test student registration endpoint with form data"""
        test_data = {
            "full_name": "John Doe Test",
            "date_of_birth": "1990-01-15",
            "gender": "Male",
            "address": "123 Test Street, Test City, Test Country",
            "email": "john.doe.test@example.com",
            "phone_number": "+1234567890",
            "educational_background": "Bachelor's Degree in Theology",
            "program_applied": "Master of Divinity",
            "study_mode": "Online"
        }
        
        return self.run_test(
            "Student Registration",
            "POST",
            "api/register-student",
            200,
            data=test_data
        )

    def test_student_registration_with_file(self):
        """Test student registration with file upload"""
        test_data = {
            "full_name": "Jane Doe Test",
            "date_of_birth": "1992-05-20",
            "gender": "Female",
            "address": "456 Test Avenue, Test City, Test Country",
            "email": "jane.doe.test@example.com",
            "phone_number": "+1234567891",
            "educational_background": "Bachelor's Degree in Biblical Studies",
            "program_applied": "Master of Theology",
            "study_mode": "Hybrid"
        }
        
        # Create a test PDF file
        test_file_content = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000074 00000 n \n0000000120 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n179\n%%EOF"
        files = {'document': ('test_document.pdf', io.BytesIO(test_file_content), 'application/pdf')}
        
        return self.run_test(
            "Student Registration with File",
            "POST",
            "api/register-student",
            200,
            data=test_data,
            files=files
        )

    def test_partnership_submission(self):
        """Test partnership submission endpoint with form data"""
        test_data = {
            "organization_name": "Test Christian Organization",
            "contact_person": "Jane Smith",
            "email": "jane.smith@testorg.com",
            "phone_number": "+1987654321",
            "partnership_type": "Academic Partnership",
            "message": "We are interested in establishing an academic partnership with WHIBC to enhance theological education in our region."
        }
        
        return self.run_test(
            "Partnership Submission",
            "POST",
            "api/submit-partnership",
            200,
            data=test_data
        )

    def test_partnership_submission_with_file(self):
        """Test partnership submission with file upload"""
        test_data = {
            "organization_name": "Test Ministry Partners",
            "contact_person": "John Smith",
            "email": "john.smith@testministry.com",
            "phone_number": "+1987654322",
            "partnership_type": "Ministry Partnership",
            "message": "We would like to explore ministry partnership opportunities with WHIBC."
        }
        
        # Create a test Word document
        test_file_content = b"PK\x03\x04\x14\x00\x00\x00\x08\x00Test Word Document Content"
        files = {'document': ('partnership_proposal.docx', io.BytesIO(test_file_content), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}
        
        return self.run_test(
            "Partnership Submission with File",
            "POST",
            "api/submit-partnership",
            200,
            data=test_data,
            files=files
        )

    def test_get_registrations_unauthorized(self):
        """Test get registrations endpoint without auth (should fail)"""
        return self.run_test(
            "Get Registrations (Unauthorized)",
            "GET",
            "api/registrations",
            401  # Should be unauthorized
        )

    def test_get_registrations_authorized(self):
        """Test get registrations endpoint with auth"""
        if not self.admin_token:
            print("❌ No admin token available for authorized test")
            return False
            
        return self.run_test(
            "Get Registrations (Authorized)",
            "GET",
            "api/registrations",
            200,
            auth_required=True
        )

    def test_get_partnerships_unauthorized(self):
        """Test get partnerships endpoint without auth (should fail)"""
        return self.run_test(
            "Get Partnerships (Unauthorized)",
            "GET",
            "api/partnerships",
            401  # Should be unauthorized
        )

    def test_get_partnerships_authorized(self):
        """Test get partnerships endpoint with auth"""
        if not self.admin_token:
            print("❌ No admin token available for authorized test")
            return False
            
        return self.run_test(
            "Get Partnerships (Authorized)",
            "GET",
            "api/partnerships",
            200,
            auth_required=True
        )

    def test_gallery_get_public(self):
        """Test public gallery endpoint"""
        success, response = self.run_test(
            "Get Gallery Images (Public)",
            "GET",
            "api/gallery",
            200
        )
        
        if success and response:
            print(f"📸 Found {len(response)} gallery images")
            for img in response[:3]:  # Show first 3 images
                print(f"  - {img.get('title', 'No title')} ({img.get('category', 'No category')})")
        
        return success

    def test_gallery_upload_unauthorized(self):
        """Test gallery upload without auth (should fail)"""
        test_data = {
            "title": "Test Image",
            "description": "Test Description",
            "category": "events"
        }
        
        # Create a test image file
        test_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\x12IDATx\x9cc```bPPP\x00\x02\xac\x01\x00\x00\x05\x00\x01\r\n-\xdb\x00\x00\x00\x00IEND\xaeB`\x82'
        files = {'image': ('test_image.png', io.BytesIO(test_image_content), 'image/png')}
        
        return self.run_test(
            "Gallery Upload (Unauthorized)",
            "POST",
            "api/gallery/upload",
            401,  # Should be unauthorized
            data=test_data,
            files=files
        )

    def test_gallery_upload_authorized(self):
        """Test gallery upload with auth"""
        if not self.admin_token:
            print("❌ No admin token available for gallery upload test")
            return False
        
        test_data = {
            "title": "WHIBC Academic Excellence Event",
            "description": "Students and faculty celebrating academic achievements at Word of Hope International Bible College",
            "category": "events"
        }
        
        # Create a test image file (small PNG)
        test_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\x12IDATx\x9cc```bPPP\x00\x02\xac\x01\x00\x00\x05\x00\x01\r\n-\xdb\x00\x00\x00\x00IEND\xaeB`\x82'
        files = {'image': ('test_academic_event.png', io.BytesIO(test_image_content), 'image/png')}
        
        # Add authorization header manually for multipart form data
        headers = {'Authorization': f'Bearer {self.admin_token}'}
        
        url = f"{self.base_url}/api/gallery/upload"
        self.tests_run += 1
        print(f"\n🔍 Testing Gallery Upload (Authorized)...")
        print(f"URL: {url}")
        
        try:
            response = requests.post(url, data=test_data, files=files, headers=headers, timeout=15)
            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == 200
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    # Store the filename for deletion test
                    self.uploaded_image_filename = response_data.get('filename')
                    print(f"📸 Uploaded image filename: {self.uploaded_image_filename}")
                except:
                    print(f"Response Text: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                print(f"Response: {response.text[:500]}...")
            
            return success
            
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_gallery_upload_graduation_category(self):
        """Test gallery upload with graduation category"""
        if not self.admin_token:
            print("❌ No admin token available for gallery upload test")
            return False
        
        test_data = {
            "title": "WHIBC Convocation Ceremony",
            "description": "Annual convocation ceremony celebrating our graduates",
            "category": "graduation"
        }
        
        # Create a test image file
        test_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\x12IDATx\x9cc```bPPP\x00\x02\xac\x01\x00\x00\x05\x00\x01\r\n-\xdb\x00\x00\x00\x00IEND\xaeB`\x82'
        files = {'image': ('convocation_ceremony.png', io.BytesIO(test_image_content), 'image/png')}
        
        # Add authorization header manually for multipart form data
        headers = {'Authorization': f'Bearer {self.admin_token}'}
        
        url = f"{self.base_url}/api/gallery/upload"
        self.tests_run += 1
        print(f"\n🔍 Testing Gallery Upload (Graduation Category)...")
        print(f"URL: {url}")
        
        try:
            response = requests.post(url, data=test_data, files=files, headers=headers, timeout=15)
            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == 200
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    # Store the image ID for deletion test
                    self.graduation_image_filename = response_data.get('filename')
                    print(f"📸 Uploaded graduation image filename: {self.graduation_image_filename}")
                except:
                    print(f"Response Text: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                print(f"Response: {response.text[:500]}...")
            
            return success
            
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_gallery_delete_unauthorized(self):
        """Test gallery delete without auth (should fail)"""
        # Use a dummy image ID
        dummy_image_id = "test-image-id-123"
        
        return self.run_test(
            "Gallery Delete (Unauthorized)",
            "DELETE",
            f"api/gallery/{dummy_image_id}",
            401  # Should be unauthorized
        )

    def test_gallery_delete_authorized(self):
        """Test gallery delete with auth"""
        if not self.admin_token:
            print("❌ No admin token available for gallery delete test")
            return False
        
        # First, get all gallery images to find one to delete
        success, response = self.run_test(
            "Get Gallery Images for Deletion Test",
            "GET",
            "api/gallery",
            200
        )
        
        if not success or not response:
            print("❌ Could not get gallery images for deletion test")
            return False
        
        if len(response) == 0:
            print("⚠️ No gallery images found to delete")
            return True  # Not a failure, just no images to delete
        
        # Get the first image ID
        image_to_delete = response[0]
        image_id = image_to_delete.get('id')
        image_title = image_to_delete.get('title', 'Unknown')
        
        if not image_id:
            print("❌ No image ID found in gallery response")
            return False
        
        print(f"🗑️ Attempting to delete image: {image_title} (ID: {image_id})")
        
        success, delete_response = self.run_test(
            f"Gallery Delete (Authorized) - {image_title}",
            "DELETE",
            f"api/gallery/{image_id}",
            200,
            auth_required=True
        )
        
        if success:
            print(f"✅ Successfully deleted image: {image_title}")
            
            # Verify the image is actually deleted by checking gallery again
            verify_success, verify_response = self.run_test(
                "Verify Image Deletion",
                "GET",
                "api/gallery",
                200
            )
            
            if verify_success and verify_response:
                # Check if the deleted image is no longer in the list
                remaining_ids = [img.get('id') for img in verify_response]
                if image_id not in remaining_ids:
                    print(f"✅ Confirmed: Image {image_id} is no longer in gallery")
                else:
                    print(f"⚠️ Warning: Image {image_id} still appears in gallery after deletion")
        
        return success

    def test_gallery_delete_nonexistent(self):
        """Test deleting non-existent gallery image"""
        if not self.admin_token:
            print("❌ No admin token available for gallery delete test")
            return False
        
        nonexistent_id = "nonexistent-image-id-12345"
        
        return self.run_test(
            "Gallery Delete (Non-existent Image)",
            "DELETE",
            f"api/gallery/{nonexistent_id}",
            404,  # Should return not found
            auth_required=True
        )

    def test_admin_dashboard_unauthorized(self):
        """Test admin dashboard endpoint without auth (should fail)"""
        return self.run_test(
            "Admin Dashboard (Unauthorized)",
            "GET",
            "api/admin/dashboard",
            401  # Should be unauthorized
        )

    def test_admin_dashboard_authorized(self):
        """Test admin dashboard endpoint with auth"""
        if not self.admin_token:
            print("❌ No admin token available for authorized test")
            return False
            
        success, response = self.run_test(
            "Admin Dashboard (Authorized)",
            "GET",
            "api/admin/dashboard",
            200,
            auth_required=True
        )
        
        if success and response:
            print("📊 Dashboard Stats:")
            stats = response.get('stats', {})
            print(f"  - Total Registrations: {stats.get('total_registrations', 'N/A')}")
            print(f"  - Total Partnerships: {stats.get('total_partnerships', 'N/A')}")
            print(f"  - Total Gallery Images: {stats.get('total_gallery', 'N/A')}")
            
            recent_regs = response.get('recent_registrations', [])
            recent_parts = response.get('recent_partnerships', [])
            print(f"  - Recent Registrations: {len(recent_regs)}")
            print(f"  - Recent Partnerships: {len(recent_parts)}")
        
        return success

    def test_invalid_registration(self):
        """Test registration with invalid data"""
        invalid_data = {
            "full_name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "phone_number": "123"  # Missing required fields
        }
        
        success, response = self.run_test(
            "Invalid Registration Data",
            "POST",
            "api/register-student",
            422,  # Validation error expected
            data=invalid_data
        )
        return success

def main():
    print("🎓 WHIBC API Testing Suite")
    print("=" * 50)
    
    # Setup
    tester = WHIBCAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Basic connectivity tests
    tester.test_health_endpoint()
    tester.test_api_root()
    
    # Admin Authentication Tests
    print("\n🔐 Testing Admin Authentication...")
    tester.test_admin_login_invalid()  # Test invalid credentials first
    tester.test_admin_login_valid()    # Get valid token
    tester.test_admin_login_superadmin()  # Test superadmin
    tester.test_verify_admin_token()   # Verify token works
    
    # Test protected endpoints without auth (should fail)
    print("\n🚫 Testing Protected Endpoints Without Auth...")
    tester.test_get_registrations_unauthorized()
    tester.test_get_partnerships_unauthorized()
    tester.test_admin_dashboard_unauthorized()
    
    # Test protected endpoints with auth (should succeed)
    print("\n✅ Testing Protected Endpoints With Auth...")
    tester.test_get_registrations_authorized()
    tester.test_get_partnerships_authorized()
    tester.test_admin_dashboard_authorized()
    
    # Core functionality tests
    print("\n📝 Testing Core Functionality...")
    tester.test_student_registration()
    tester.test_student_registration_with_file()
    tester.test_partnership_submission()
    tester.test_partnership_submission_with_file()
    
    # Gallery tests
    print("\n📸 Testing Gallery Management...")
    tester.test_gallery_get_public()
    tester.test_gallery_upload_unauthorized()
    tester.test_gallery_upload_authorized()
    tester.test_gallery_upload_graduation_category()
    tester.test_gallery_delete_unauthorized()
    tester.test_gallery_delete_nonexistent()
    tester.test_gallery_delete_authorized()  # This should be last as it deletes images
    
    # Error handling tests
    tester.test_invalid_registration()
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())