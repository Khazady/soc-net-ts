import React from "react"
import s from "./Page404.module.css"

export const Page404 = () => {
    return (
      <div className={s.block}>
          <div className={s.c}>
              <div className={s._404}>404</div>
              <hr/>
              <div className={s._1}>THE PAGE</div>
              <div className={s._2}>WAS NOT FOUND</div>
              <a className={s.btn} href='#/profile'>BACK TO PROFILE</a>
          </div>
      </div>
    )
}