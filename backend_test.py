import requests
import sys
import json
from datetime import datetime

class WHIBCAPITester:
    def __init__(self, base_url="https://whibc-portal.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

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
        """Test student registration endpoint"""
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

    def test_partnership_submission(self):
        """Test partnership submission endpoint"""
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
    tester.test_partnership_submission()
    
    # Admin endpoint tests
    tester.test_get_registrations()
    tester.test_get_partnerships()
    
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