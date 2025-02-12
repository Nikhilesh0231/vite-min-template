import './Button.css'
const Button = ({toggle,changehandler,setToggle}) => {

return (
    <div className={(toggle)? "button" :"button1"}>
      <div onClick={()=>{changehandler()}} className={(toggle) ? 'toggle' : 'toggle1'}></div>
    </div>
  );
};

export default Button;