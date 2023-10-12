import React from 'react'
import cl from './MyModal.module.css'

const MyModal = ({ children, visible, setVisible }) => {


    const rootClasses = [cl.myModal]

    if (visible) {
        //console.log("rootClasses", rootClasses)
        rootClasses.push(cl.active)
        //console.log("new rootClasses", rootClasses)
    }
    // stopPropagation - предотвращение всплытия события - 
    // в родительском div onClick не должен срабатывать для дочернего div

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e)=> e.stopPropagation()}>
                
                {children}
            </div>
        </div >
    )
}

export default MyModal