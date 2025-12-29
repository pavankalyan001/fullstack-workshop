const validatePassword = password => {
  const errors = [];
  const suggestions = [];
  let score = 0;

  const commonPasswords = ["password", "123456", "qwerty", "admin", "letmein"];

  const rules = [
    {
      test: pwd => pwd.length >= 8,
      error: "Too short",
      suggestion: "Use at least 8 characters"
    },
    {
      test: pwd => /[A-Z]/.test(pwd),
      error: "No uppercase letter",
      suggestion: "Add an uppercase letter"
    },
    {
      test: pwd => /[a-z]/.test(pwd),
      error: "No lowercase letter",
      suggestion: "Add a lowercase letter"
    },
    {
      test: pwd => /[0-9]/.test(pwd),
      error: "No number",
      suggestion: "Add a number"
    },
    {
      test: pwd => /[!@#$%^&*()_+\-=]/.test(pwd),
      error: "No special character",
      suggestion: "Add a special character"
    }
  ];

  rules.forEach(rule => {
    if (rule.test(password)) {
      score += 20;
    } else {
      errors.push(rule.error);
      suggestions.push(rule.suggestion);
    }
  });

  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push("Common password");
    suggestions.push("Avoid common passwords");
    score = Math.min(score, 20);
  }

  return {
    isValid: errors.length === 0,
    score,
    errors,
    suggestions
  };
};

/* ================= TEST ================= */

console.log(
  `Password validation result:`,
  validatePassword("MyP@ssw0rd!2024")
);
