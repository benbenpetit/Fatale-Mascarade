import { FC } from 'react'
import styles from './InputText.module.scss'
import clsx from 'clsx'

interface Props {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

const InputText: FC<Props> = ({ value, onValueChange, placeholder }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
      />
      <span className={clsx(styles.lightLine, styles.first)} />
      <span className={clsx(styles.lightLine, styles.second)} />
    </div>
  )
}

export default InputText
