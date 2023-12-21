// Define a class to represent employee information
class Employee {
  age: number;
  sex: string;
  maritalStatus: string;

  constructor(age: number, sex: string, maritalStatus: string) {
    this.age = age;
    this.sex = sex;
    this.maritalStatus = maritalStatus;
  }

  // Method to determine the place of service
  determinePlaceOfService(): string {
    if (this.sex === 'F') {
      return "You will work only in urban areas.";
    } else if (this.sex === 'M' && this.age >= 20 && this.age <= 40) {
      return "You may work anywhere.";
    } else if (this.sex === 'M' && this.age >= 40 && this.age <= 60) {
      return "You will work in urban areas only.";
    } else {
      return "ERROR";
    }
  }
}

function validateEmployeeData(
  age: any,
  sex: any,
  maritalStatus: any,
  grossSalaryInput: any,
  totalSavingsInput: any
): Employee | string {
  // Check if age is a number, sex is a string, and maritalStatus is a string
  if (
    typeof age === 'number' &&
    typeof sex === 'string' &&
    typeof maritalStatus === 'string' &&
    typeof grossSalaryInput === 'number' &&
    typeof totalSavingsInput === 'number'
  ) {
    // Create an instance of the Employee class
    const employee = new Employee(age, sex, maritalStatus);
    return employee;
  } else {
    alert("Check the data entered");
    return "";
  }
}

// Function to handle form submission
function submitForm() {
  const ageInput: HTMLInputElement | null = document.getElementById('ageInput') as HTMLInputElement;
  const sexInput: HTMLInputElement | null = document.getElementById('sexInput') as HTMLInputElement;
  const maritalStatusInput: HTMLInputElement | null = document.getElementById('maritalStatusInput') as HTMLInputElement;
  const grossSalaryInput: HTMLInputElement | null = document.getElementById('grossSalaryInput') as HTMLInputElement;
  const totalSavingsInput: HTMLInputElement | null = document.getElementById('totalSavingsInput') as HTMLInputElement;

  // Check if any input field is empty
  if (
    !ageInput.value ||
    !sexInput.value ||
    !maritalStatusInput.value ||
    !grossSalaryInput.value ||
    !totalSavingsInput.value
  ) {
    alert("Please fill in all fields");
    return;
  }

  // Proceed with validation and calculations
  if (ageInput && sexInput && maritalStatusInput && grossSalaryInput && totalSavingsInput) {
    const age: number = parseInt(ageInput.value, 10);
    const sex: string = sexInput.value.toUpperCase();
    const maritalStatus: string = maritalStatusInput.value.toUpperCase();
    const grossSalary: number = parseFloat(grossSalaryInput.value);
    const totalSavings: number = parseFloat(totalSavingsInput.value);

    // Validate employee data types
    const employeeData = validateEmployeeData(age, sex, maritalStatus, grossSalary, totalSavings);

    // Display the results
    if (employeeData instanceof Employee) {
      const placeOfService = employeeData.determinePlaceOfService();

      // Calculate tax
      const taxableIncome = grossSalary - Math.min(totalSavings, 100000);
      let tax = 0;
      if (taxableIncome > 100000) {
        if (taxableIncome <= 200000) {
          tax = 0.1 * (taxableIncome - 100000);
        } else if (taxableIncome <= 500000) {
          tax = 0.1 * (200000 - 100000) + 0.2 * (taxableIncome - 200000);
        } else {
          tax = 0.1 * (200000 - 100000) + 0.2 * (500000 - 200000) + 0.3 * (taxableIncome - 500000);
        }
      }

      // Display the results below the button
      const resultDiv = document.getElementById('result');
      if (resultDiv) {
        resultDiv.innerHTML = `<p>${placeOfService}</p><p>Your tax is: ${tax}</p>`;
      }
    } else {
      console.error(employeeData);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById('submitButton');
  if (submitButton) {
    submitButton.addEventListener('click', submitForm);
  }
});