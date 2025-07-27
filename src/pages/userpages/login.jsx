import { Form, Link } from "react-router-dom"
import styles from './login.module.css'

export function Login() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        <div className={styles.leftContainer}>
          <p className={styles.qrPrompt1}>
            扫描二维码登录
          </p>
          <div className={styles.qrContainer}>
            <img className={styles.qrCodeImg} src="/pictures/app-pictures/loginQR.jpg" />
            <p className={styles.qrPrompt2}>
              请使用<span>客户端</span>扫码登录或扫码下载APP
            </p>
          </div>
        </div>
        <div className={styles.rightFormContainer}>
          <div>
            <Link className={styles.link}>
              密码登录
            </Link>
            <Link className={styles.link}>
              短信登录
            </Link>
          </div>
          <Form className={styles.formContainer}>
            <div style={{borderBottom: 'none', borderBottomRightRadius: '0', borderBottomLeftRadius: '0'}} className={styles.inputContainer}>
              <p className={styles.inputPrompt}>账号</p>
              <input className={styles.input} placeholder="请输入账号"/>
            </div>
            <div style={{borderTopRightRadius: '0', borderTopLeftRadius: '0'}} className={styles.inputContainer}>
              <p className={styles.inputPrompt}>密码</p>
              <input type="password" className={styles.input} placeholder="请输入密码"/>
            </div>
            <div>
              <button>注册</button>
              <button>登录</button>
            </div>
          </Form>
          <div>
            其他方式登录
          </div>
          <div>
            <Link className={styles.link}>
              微信登录
            </Link>
            <Link className={styles.link}>
              微博登录
            </Link>
            <Link className={styles.link}>
              QQ登录
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.policy}>
        未注册过的手机号，我们将自动帮您注册账号。登录或完成注册即代表您同意<span>用户协议</span>和<span>隐私政策</span>
      </div>
    </div>
    </>
  )
} 