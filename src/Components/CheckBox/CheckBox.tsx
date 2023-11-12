import classes from "./CheckBox.module.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className={classes.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={classes.checkbox}
      />
      {label}
    </label>
  );
};

export default Checkbox;
