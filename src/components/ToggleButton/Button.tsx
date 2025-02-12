import './Button.css'
interface ButtonProps {
  toggle: boolean;         // Determines if the button is toggled or not
  changehandler: () => void; // Function to change the toggle state
  setToggle: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the toggle state
}

const Button: React.FC<ButtonProps> = ({ toggle, changehandler, setToggle }) => {
  // Handler to toggle the state (when clicked)
  const handleClick = () => {
    changehandler();
    setToggle(!toggle); // Toggle the state
  };
return (
    <div className={(toggle)? "button" :"button1"}>
      <div onClick={()=>{handleClick()}} className={(toggle) ? 'toggle' : 'toggle1'}></div>
    </div>
  );
};

export default Button;