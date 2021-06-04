import styles from "./AboutText.module.scss";

export default function AboutText() {

    return (
        <div className={styles.container}>
            <h1>About</h1>
            <div>
                <p>My name is Luca Palmisano. I’m 18 years old and I’m currently studying computer science at university.</p>
                <p>I’ve been coding for several years now. Through the years, what was once a hobby has became a passion. I have always been interested in discovering new things and this has helped me to expand my knowledge of information technology.</p>
                <p>Besides that I am enjoying living a student’s life, having fun with my friends, playing games, etc.Well, there you have it, this is me! This is who I am! </p>
            </div>
        </div>
    )
}