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
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=15)
            elif method == 'POST':
                if files:
                    # For form data with files
                    response = requests.post(url, data=data, files=files, timeout=15)
                else:
                    # For JSON data
                    response = requests.post(url, json=data, headers=headers, timeout=15)

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

    def test_get_registrations(self):
        """Test get registrations endpoint (admin)"""
        return self.run_test(
            "Get Registrations",
            "GET",
            "api/registrations",
            200
        )

    def test_get_partnerships(self):
        """Test get partnerships endpoint (admin)"""
        return self.run_test(
            "Get Partnerships",
            "GET",
            "api/partnerships",
            200
        )

    def test_gallery_endpoints(self):
        """Test gallery endpoints"""
        success, response = self.run_test(
            "Get Gallery Images",
            "GET",
            "api/gallery",
            200
        )
        return success

    def test_admin_dashboard(self):
        """Test admin dashboard endpoint"""
        success, response = self.run_test(
            "Admin Dashboard",
            "GET",
            "api/admin/dashboard",
            200
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
    
    # Core functionality tests
    tester.test_student_registration()
    tester.test_student_registration_with_file()
    tester.test_partnership_submission()
    tester.test_partnership_submission_with_file()
    
    # Admin endpoint tests
    tester.test_get_registrations()
    tester.test_get_partnerships()
    tester.test_admin_dashboard()
    
    # Gallery tests
    tester.test_gallery_endpoints()
    
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