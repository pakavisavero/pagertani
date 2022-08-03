import { Fragment, useCallback, useEffect, useState } from 'react'
import styles from './Toast.module.css'

 
const Toast = ({toastlist, position}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
        setShow(false);
    }, 1500);

    return () => {
      clearTimeout(interval);
      setShow(true);
    }
  }, [toastlist]);

  return (
    <Fragment>
        {
          show ? <div className={`${styles.container} ${styles[position]}`}>
          {
            toastlist.map((toast, i) => (
              <div
                key={i}
                className={`${styles.notification} ${styles.toast} ${styles[position]}`}
                style={{ backgroundColor: toast.backgroundColor }}
              >
                <div>
                  <p className={styles.title}>{toast.title}</p>
                  <p className={styles.description}>{toast.description}</p>
                </div>
              </div>
            ))
          } </div> : <div></div>
        }
    </Fragment>
  )
}

export default Toast
