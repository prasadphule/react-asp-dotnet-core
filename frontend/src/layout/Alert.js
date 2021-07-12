export default function Alert({ alertType, setOpen }) {
  return (
    <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
      A simple danger alert—check it out!
      <button type="button" class="btn-close" onClick={setOpen} aria-label="Close"></button>
    </div>
  )
}