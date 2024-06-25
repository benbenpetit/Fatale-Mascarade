import styles from './CustomToast.module.scss'
import toast from 'react-hot-toast'

const CustomToast = () => {
  return toast.custom((t) => (
    <div className={styles.container}>
      <span>allo</span>
    </div>
  ))
}

export default CustomToast
