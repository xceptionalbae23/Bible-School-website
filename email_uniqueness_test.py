import requests
import sys
import json
from datetime import datetime

class EmailUniquenessAPITester:
    def __init__(self, base_url="https://whibc-portal.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_emails = []

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {}
        
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
                    # For JSON data or form data
                    if endpoint.startswith('api/register-student') or endpoint.startswith('api/submit-partnership'):
                        # These endpoints expect form data
                        response = requests.post(url, data=data, timeout=15)
                    else:
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

    def test_email_availability_check_new_email(self):
        """Test email availability check for a new email"""
        test_email = f"new.email.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
        self.test_emails.append(test_email)
        
        success, response = self.run_test(
            "Email Availability Check (New Email)",
            "GET",
            f"api/check-email/{test_email}",
            200
        )
        
        if success and response:
            expected_available = True
            actual_available = response.get('available')
            if actual_available == expected_available:
                print(f"✅ Email availability correctly reported as: {actual_available}")
                print(f"Student registered: {response.get('student_registered')}")
                print(f"Partnership registered: {response.get('partnership_registered')}")
            else:
                print(f"❌ Email availability incorrect. Expected: {expected_available}, Got: {actual_available}")
                success = False
        
        return success, test_email

    def test_email_availability_check_existing_email(self, existing_email):
        """Test email availability check for an existing email"""
        success, response = self.run_test(
            "Email Availability Check (Existing Email)",
            "GET",
            f"api/check-email/{existing_email}",
            200
        )
        
        if success and response:
            expected_available = False
            actual_available = response.get('available')
            if actual_available == expected_available:
                print(f"✅ Email availability correctly reported as: {actual_available}")
                print(f"Student registered: {response.get('student_registered')}")
                print(f"Partnership registered: {response.get('partnership_registered')}")
            else:
                print(f"❌ Email availability incorrect. Expected: {expected_available}, Got: {actual_available}")
                success = False
        
        return success

    def test_student_registration_first_time(self, email):
        """Test student registration with unique email (should succeed)"""
        test_data = {
            "full_name": "First Student",
            "date_of_birth": "1990-01-15",
            "gender": "Male",
            "address": "123 Test Street, Test City, Test Country",
            "email": email,
            "phone_number": "+1234567890",
            "educational_background": "Bachelor's Degree in Theology",
            "program_applied": "Certificate in Biblical Studies",
            "study_mode": "Online"
        }
        
        success, response = self.run_test(
            "Student Registration (First Time - Should Succeed)",
            "POST",
            "api/register-student",
            200,
            data=test_data
        )
        
        if success and response:
            if response.get('status') == 'success':
                print(f"✅ Registration successful: {response.get('message')}")
            else:
                print(f"❌ Registration failed: {response.get('message')}")
                success = False
        
        return success

    def test_student_registration_duplicate_email(self, email):
        """Test student registration with duplicate email (should fail)"""
        test_data = {
            "full_name": "Second Student",
            "date_of_birth": "1992-05-20",
            "gender": "Female",
            "address": "456 Test Avenue, Test City, Test Country",
            "email": email,
            "phone_number": "+1234567891",
            "educational_background": "Bachelor's Degree in Biblical Studies",
            "program_applied": "Diploma in Theology",
            "study_mode": "Hybrid"
        }
        
        success, response = self.run_test(
            "Student Registration (Duplicate Email - Should Fail)",
            "POST",
            "api/register-student",
            400,  # Bad Request expected for duplicate email
            data=test_data
        )
        
        if success and response:
            expected_message_part = f"A student with email {email} is already registered"
            actual_message = response.get('detail', '')
            if expected_message_part in actual_message:
                print(f"✅ Correct error message: {actual_message}")
            else:
                print(f"❌ Incorrect error message. Expected to contain: '{expected_message_part}', Got: '{actual_message}'")
                success = False
        
        return success

    def test_partnership_submission_first_time(self, email):
        """Test partnership submission with unique email (should succeed)"""
        test_data = {
            "organization_name": "First Church",
            "contact_person": "Jane Smith",
            "email": email,
            "phone_number": "+1987654321",
            "partnership_type": "Ministry Support",
            "message": "We are interested in establishing a ministry support partnership with WHIBC."
        }
        
        success, response = self.run_test(
            "Partnership Submission (First Time - Should Succeed)",
            "POST",
            "api/submit-partnership",
            200,
            data=test_data
        )
        
        if success and response:
            if response.get('status') == 'success':
                print(f"✅ Partnership submission successful: {response.get('message')}")
            else:
                print(f"❌ Partnership submission failed: {response.get('message')}")
                success = False
        
        return success

    def test_partnership_submission_duplicate_email(self, email):
        """Test partnership submission with duplicate email (should fail)"""
        test_data = {
            "organization_name": "Second Church",
            "contact_person": "John Smith",
            "email": email,
            "phone_number": "+1987654322",
            "partnership_type": "Scholarship Funding",
            "message": "We would like to explore scholarship funding opportunities with WHIBC."
        }
        
        success, response = self.run_test(
            "Partnership Submission (Duplicate Email - Should Fail)",
            "POST",
            "api/submit-partnership",
            400,  # Bad Request expected for duplicate email
            data=test_data
        )
        
        if success and response:
            expected_message_part = f"A partnership application with email {email} already exists"
            actual_message = response.get('detail', '')
            if expected_message_part in actual_message:
                print(f"✅ Correct error message: {actual_message}")
            else:
                print(f"❌ Incorrect error message. Expected to contain: '{expected_message_part}', Got: '{actual_message}'")
                success = False
        
        return success

def main():
    print("📧 WHIBC Email Uniqueness Validation Testing Suite")
    print("=" * 60)
    
    # Setup
    tester = EmailUniquenessAPITester()
    
    print("\n📋 Running Email Uniqueness Validation Tests...")
    
    # Test Scenario 1: Student Registration Duplicate Email
    print("\n" + "="*50)
    print("🎓 SCENARIO 1: Student Registration Duplicate Email")
    print("="*50)
    
    # First, check email availability for new email
    success1, student_test_email = tester.test_email_availability_check_new_email()
    
    if success1:
        # Register student with unique email (should succeed)
        success2 = tester.test_student_registration_first_time(student_test_email)
        
        if success2:
            # Check email availability after registration (should be unavailable)
            success3 = tester.test_email_availability_check_existing_email(student_test_email)
            
            # Try to register another student with same email (should fail)
            success4 = tester.test_student_registration_duplicate_email(student_test_email)
    
    # Test Scenario 2: Partnership Application Duplicate Email
    print("\n" + "="*50)
    print("🤝 SCENARIO 2: Partnership Application Duplicate Email")
    print("="*50)
    
    # Generate unique email for partnership test
    partnership_test_email = f"partner.duplicate.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
    tester.test_emails.append(partnership_test_email)
    
    # Check email availability for new email
    success5, _ = tester.test_email_availability_check_new_email()
    # Override the email for this specific test
    partnership_test_email = f"partner.duplicate.{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"
    
    if success5:
        # Submit partnership with unique email (should succeed)
        success6 = tester.test_partnership_submission_first_time(partnership_test_email)
        
        if success6:
            # Check email availability after partnership submission (should be unavailable)
            success7 = tester.test_email_availability_check_existing_email(partnership_test_email)
            
            # Try to submit another partnership with same email (should fail)
            success8 = tester.test_partnership_submission_duplicate_email(partnership_test_email)
    
    # Test Scenario 3: Cross-validation (student email used for partnership and vice versa)
    print("\n" + "="*50)
    print("🔄 SCENARIO 3: Cross-validation Between Student and Partnership")
    print("="*50)
    
    # Try to use student email for partnership (should fail)
    if student_test_email:
        success9 = tester.test_partnership_submission_duplicate_email(student_test_email)
    
    # Try to use partnership email for student registration (should fail)
    if partnership_test_email:
        success10 = tester.test_student_registration_duplicate_email(partnership_test_email)
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    print(f"\n📧 Test Emails Used:")
    for email in tester.test_emails:
        print(f"  - {email}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All email uniqueness validation tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())