import Image from "next/image";

import styles from "./LoginFooter.module.scss";

import { googleImage, facebookImage, githubImage } from "@/public/images";

const LoginFooter = ({
  isLogin,
  onChangeLogin,
}: {
  isLogin: boolean;
  onChangeLogin: () => void;
}) => {
  return (
    <div className={styles.footer}>
      <div className={styles["other-sign"]}>
        Or {isLogin ? "Sign in" : "Sign up"} with
      </div>

      <div className={styles.link}>
        {isLogin ? (
          <>
            {"Don't"} have an account?{" "}
            <span onClick={onChangeLogin}>Register Now</span>
          </>
        ) : (
          <>
            Do have an account? <span onClick={onChangeLogin}>Login Now</span>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginFooter;
