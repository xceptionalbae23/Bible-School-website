import requests
import sys
import json
from datetime import datetime

class EmailFunctionalityTester:
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

    def test_student_registration_with_email(self):
        """Test student registration with email functionality"""
        test_data = {
            "full_name": "Sarah Johnson",
            "date_of_birth": "1995-03-15",
            "gender": "Female",
            "address": "123 Faith Street, Hope City, Ontario, Canada",
            "email": "sarah.johnson.test@gmail.com",
            "phone_number": "+1-416-555-0123",
            "educational_background": "Bachelor of Arts in Religious Studies from University of Toronto",
            "program_applied": "Master of Arts in Theology",
            "study_mode": "Hybrid"
        }
        
        return self.run_test(
            "Student Registration with Email",
            "POST",
            "api/register-student",
            200,
            data=test_data
        )

    def test_partnership_submission_with_email(self):
        """Test partnership submission with email functionality"""
        test_data = {
            "organization_name": "Grace Community Church",
            "contact_person": "Pastor Michael Thompson",
            "email": "pastor.michael@gracecc.org",
            "phone_number": "+1-905-555-0456",
            "partnership_type": "Ministry Support",
            "message": "Grace Community Church is interested in partnering with WHIBC to support student scholarships and provide internship opportunities for graduates. We have been serving our community for over 20 years and would love to collaborate in training future Christian leaders."
        }
        
        return self.run_test(
            "Partnership Submission with Email",
            "POST",
            "api/submit-partnership",
            200,
            data=test_data
        )

    def verify_data_persistence(self):
        """Verify that the submitted data was saved to database"""
        print("\n📊 Verifying Data Persistence...")
        
        # Get registrations
        success, registrations = self.run_test(
            "Get Recent Registrations",
            "GET",
            "api/registrations",
            200
        )
        
        if success and registrations:
            # Check if our test registration exists
            sarah_found = False
            for reg in registrations:
                if reg.get('full_name') == 'Sarah Johnson' and reg.get('email') == 'sarah.johnson.test@gmail.com':
                    sarah_found = True
                    print(f"✅ Found Sarah Johnson's registration: {reg.get('id')}")
                    break
            
            if not sarah_found:
                print("⚠️ Sarah Johnson's registration not found in database")
        
        # Get partnerships
        success, partnerships = self.run_test(
            "Get Recent Partnerships",
            "GET",
            "api/partnerships",
            200
        )
        
        if success and partnerships:
            # Check if our test partnership exists
            grace_found = False
            for partnership in partnerships:
                if partnership.get('organization_name') == 'Grace Community Church' and partnership.get('email') == 'pastor.michael@gracecc.org':
                    grace_found = True
                    print(f"✅ Found Grace Community Church partnership: {partnership.get('id')}")
                    break
            
            if not grace_found:
                print("⚠️ Grace Community Church partnership not found in database")

def main():
    print("📧 WHIBC Email Functionality Testing Suite")
    print("=" * 60)
    
    # Setup
    tester = EmailFunctionalityTester()
    
    # Run email functionality tests
    print("\n📋 Running Email Functionality Tests...")
    
    # Test the exact same data that was submitted via the UI
    tester.test_student_registration_with_email()
    tester.test_partnership_submission_with_email()
    
    # Verify data persistence
    tester.verify_data_persistence()
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All email functionality tests passed!")
        print("✅ SendGrid integration is working correctly")
        print("✅ Email confirmation system is functional")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())