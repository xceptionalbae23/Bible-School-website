import requests
import sys
import json
from datetime import datetime

class EmailValidationTester:
    def __init__(self, base_url="https://bible-institute-web.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_error_message=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'} if method == 'POST' and not isinstance(data, dict) else {}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, timeout=15)
            elif method == 'POST':
                # For form data (student/partnership registration)
                response = requests.post(url, data=data, timeout=15)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    
                    # Check for expected error message if provided
                    if expected_error_message and response.status_code >= 400:
                        detail = response_data.get('detail', '')
                        if expected_error_message.lower() in detail.lower():
                            print(f"✅ Expected error message found: {detail}")
                        else:
                            print(f"⚠️  Expected error message not found. Got: {detail}")
                            
                except:
                    print(f"Response Text: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:500]}...")
                self.failed_tests.append(f"{name}: Expected {expected_status}, got {response.status_code}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name}: Exception - {str(e)}")
            return False, {}

    def test_scenario_1_student_first(self):
        """Scenario 1: Register student first, then try partnership with same email"""
        print("\n" + "="*60)
        print("🎯 SCENARIO 1: Student Email Used for Partnership (Should FAIL)")
        print("="*60)
        
        email = "cross.test.student@example.com"
        
        # Step 1: Register student (should succeed)
        student_data = {
            "full_name": "Test Student",
            "date_of_birth": "1995-01-15",
            "gender": "Male",
            "address": "123 Test Street, Test City",
            "email": email,
            "phone_number": "+1234567890",
            "educational_background": "High School Diploma",
            "program_applied": "Certificate in Biblical Studies",
            "study_mode": "Online"
        }
        
        success1, response1 = self.run_test(
            "Step 1: Register Student",
            "POST",
            "api/register-student",
            200,
            data=student_data
        )
        
        if not success1:
            print("❌ Student registration failed, cannot continue scenario 1")
            return False
            
        # Step 2: Try partnership with same email (should fail)
        partnership_data = {
            "organization_name": "Test Church",
            "contact_person": "Test Contact",
            "email": email,
            "phone_number": "+1987654321",
            "partnership_type": "Ministry Support",
            "message": "Test partnership message"
        }
        
        success2, response2 = self.run_test(
            "Step 2: Partnership with Same Email (Should FAIL)",
            "POST",
            "api/submit-partnership",
            400,  # Should fail with 400
            data=partnership_data,
            expected_error_message="already registered as a student"
        )
        
        return success1 and success2

    def test_scenario_2_partnership_first(self):
        """Scenario 2: Submit partnership first, then try student registration with same email"""
        print("\n" + "="*60)
        print("🎯 SCENARIO 2: Partnership Email Used for Student Registration (Should FAIL)")
        print("="*60)
        
        email = "cross.test.partner@example.com"
        
        # Step 1: Submit partnership (should succeed)
        partnership_data = {
            "organization_name": "First Partnership Org",
            "contact_person": "Partnership Contact",
            "email": email,
            "phone_number": "+1987654321",
            "partnership_type": "Scholarship Funding",
            "message": "Test partnership for scholarship funding"
        }
        
        success1, response1 = self.run_test(
            "Step 1: Submit Partnership",
            "POST",
            "api/submit-partnership",
            200,
            data=partnership_data
        )
        
        if not success1:
            print("❌ Partnership submission failed, cannot continue scenario 2")
            return False
            
        # Step 2: Try student registration with same email (should fail)
        student_data = {
            "full_name": "Test Student",
            "date_of_birth": "1995-01-15",
            "gender": "Female",
            "address": "456 Test Avenue, Test City",
            "email": email,
            "phone_number": "+1234567890",
            "educational_background": "Bachelor's Degree",
            "program_applied": "Diploma in Theology",
            "study_mode": "On-campus"
        }
        
        success2, response2 = self.run_test(
            "Step 2: Student Registration with Same Email (Should FAIL)",
            "POST",
            "api/register-student",
            400,  # Should fail with 400
            data=student_data,
            expected_error_message="already registered for a partnership"
        )
        
        return success1 and success2

    def test_email_availability_api(self):
        """Test the email availability API for both emails used above"""
        print("\n" + "="*60)
        print("🎯 EMAIL AVAILABILITY API TESTING")
        print("="*60)
        
        emails_to_check = [
            "cross.test.student@example.com",
            "cross.test.partner@example.com"
        ]
        
        all_success = True
        
        for email in emails_to_check:
            success, response = self.run_test(
                f"Check Email Availability: {email}",
                "GET",
                f"api/check-email/{email}",
                200
            )
            
            if success and response:
                available = response.get('available', True)
                student_registered = response.get('student_registered', False)
                partnership_registered = response.get('partnership_registered', False)
                
                print(f"📧 Email: {email}")
                print(f"   Available: {available}")
                print(f"   Student Registered: {student_registered}")
                print(f"   Partnership Registered: {partnership_registered}")
                
                # Email should NOT be available since we used it above
                if available:
                    print(f"⚠️  WARNING: Email {email} shows as available but should be unavailable!")
                    all_success = False
                else:
                    print(f"✅ Email correctly shows as unavailable")
            else:
                all_success = False
                
        return all_success

    def test_duplicate_within_same_type(self):
        """Test duplicate emails within the same registration type"""
        print("\n" + "="*60)
        print("🎯 DUPLICATE EMAILS WITHIN SAME TYPE")
        print("="*60)
        
        # Test duplicate student registration
        email = "duplicate.student@example.com"
        student_data = {
            "full_name": "Duplicate Student Test",
            "date_of_birth": "1995-01-15",
            "gender": "Male",
            "address": "123 Duplicate Street",
            "email": email,
            "phone_number": "+1234567890",
            "educational_background": "High School",
            "program_applied": "Certificate in Biblical Studies",
            "study_mode": "Online"
        }
        
        # First registration should succeed
        success1, _ = self.run_test(
            "First Student Registration",
            "POST",
            "api/register-student",
            200,
            data=student_data
        )
        
        # Second registration with same email should fail
        success2, _ = self.run_test(
            "Duplicate Student Registration (Should FAIL)",
            "POST",
            "api/register-student",
            400,
            data=student_data,
            expected_error_message="already registered as a student"
        )
        
        return success1 and success2

def main():
    print("🎓 WHIBC Email Uniqueness Validation Testing")
    print("=" * 60)
    print("Testing FIXED cross-validation system")
    print("Each email can only be used ONCE across both student registrations AND partnership applications")
    print("=" * 60)
    
    # Setup
    tester = EmailValidationTester()
    
    # Run specific cross-validation tests
    print("\n📋 Running Email Cross-Validation Tests...")
    
    # Test the two main scenarios
    scenario1_success = tester.test_scenario_1_student_first()
    scenario2_success = tester.test_scenario_2_partnership_first()
    
    # Test email availability API
    api_success = tester.test_email_availability_api()
    
    # Test duplicate within same type (bonus test)
    duplicate_success = tester.test_duplicate_within_same_type()
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    print(f"\n🎯 Scenario Results:")
    print(f"Scenario 1 (Student → Partnership): {'✅ PASSED' if scenario1_success else '❌ FAILED'}")
    print(f"Scenario 2 (Partnership → Student): {'✅ PASSED' if scenario2_success else '❌ FAILED'}")
    print(f"Email Availability API: {'✅ PASSED' if api_success else '❌ FAILED'}")
    print(f"Duplicate Prevention: {'✅ PASSED' if duplicate_success else '❌ FAILED'}")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests:")
        for failed_test in tester.failed_tests:
            print(f"  - {failed_test}")
    
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 All email validation tests passed!")
        print("✅ Cross-validation system is working correctly!")
        return 0
    else:
        print("\n⚠️  Some email validation tests failed.")
        print("❌ Cross-validation system needs attention.")
        return 1

if __name__ == "__main__":
    sys.exit(main())