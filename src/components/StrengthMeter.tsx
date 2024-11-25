import { useEffect} from "react";
import { usePasswordStore } from "../store/passwordStore";

function StrengthMeter() {
  const { password, strength, setStrength, strengthLabel, setStrengthLabel } =
    usePasswordStore();

  // Function to calculate password strength
  function calculatePasswordStrength(password: string): number {
    let strength = 0;
    // Conditions for password strength
    const lengthCondition = password.length >= 8;
    const uppercaseCondition = /[A-Z]/.test(password);
    const numberCondition = /[0-9]/.test(password);
    const specialCharacterCondition = /[^A-Za-z0-9]/.test(password);

    // Check password strength
    if (lengthCondition) strength++;
    if (uppercaseCondition) strength++;
    if (numberCondition) strength++;
    if (specialCharacterCondition) strength++;

    return Math.min(strength, 4); // Max strength level is 4
  }

  // Update strength and label dynamically based on password
  useEffect(() => {
    const validPassword = password || ""; // Fallback if password is undefined
    const computedStrength = calculatePasswordStrength(validPassword);
    setStrength(computedStrength);

    // Set strength label based on computed strength
    switch (computedStrength) {
      case 1:
        setStrengthLabel("Too Weak");
        break;
      case 2:
        setStrengthLabel("Weak");
        break;
      case 3:
        setStrengthLabel("Medium");
        break;
      case 4:
        setStrengthLabel("Strong");
        break;
      default:
        setStrengthLabel("Too Weak");
    }
  }, [password]); // Re-run effect when password changes

  return (
    <div className="strength-meter-container">
      <p className="strength-text">
        Strength
      </p>
      <div className="flex items-center gap-4">
        {/* Dynamic Strength Label */}
        <p className="strength-label">
          {strengthLabel}
        </p>

        {/* Always 4 bars, dynamic colors based on strength */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((level) => {
            let backgroundColor = "transparent"; // Default background color
            let borderColor = "#E6E5EA"; // Default border color (white)

            if (level === 1 && strength === 0) {
              backgroundColor = "#F64A4A";
              borderColor = "#F64A4A";
            }

            // Set the color based on the strength level
            if (level <= strength) {
              if (strength === 1) {
                backgroundColor = "#F64A4A";
                borderColor = "#F64A4A";
              } else if (strength === 2) {
                backgroundColor = "#FB7C58";
                borderColor = "#FB7C58";
              } else if (strength === 3) {
                backgroundColor = "#F8CD65";
                borderColor = "#F8CD65";
              } else if (strength === 4) {
                backgroundColor = "#A4FFAF";
                borderColor = "#A4FFAF";
              }
            }

            return (
              <span
                key={level}
                style={{
                  width: "0.625rem",
                  height: "1.75rem",
                  backgroundColor: backgroundColor,
                  border: `2px solid ${borderColor}`,
                }}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StrengthMeter;
