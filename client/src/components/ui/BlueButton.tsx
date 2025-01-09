
interface BlueButtonProps {
    styles:string
    text:string | JSX.Element
    onClick:()=>void
    loading:boolean
}

function BlueButton({styles,text,loading,onClick}:BlueButtonProps): JSX.Element {
  return (
    <button className={`bg-blue-500 rounded-md flex items-center justify-center hover:bg-blue-600 ${styles}`} onClick={onClick}>
        {loading?<span className="spinner"/>:text}
    </button>
  )
}

export default BlueButton
