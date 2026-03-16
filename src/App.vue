<template>
        <div id="header-wrapper">
            <div id = "header-container">
                <div id="logo-container">
                    <img :src="logo_color">
                    <img :src="logo_picture_color">
                </div>
                <div id="header-links"> 
                    <h3> Home </h3>
                    <h3> About </h3>
                </div>
                <div id="button-container">
                    <button> Log In </button> 
                </div>
            </div>
        </div>
        <div id="main-section-container">
            <h2> High Performance Parts For Your Business </h2>
            <h3> We use advanced digital tools to design highly optimized and robust parts</h3>
            <div id="main-body">
                <div id="competence-wrapper"> 
                        <div id="competence-container-1">
                            <img :src="digital_simulations_img">
                            <div id="competence-description-1">
                                <h3> Digital Simulations </h3>
                                <p> Digital simualations help to validate the product virtually</p>
                            </div>
                        </div>
                        <div id="competence-container-2">
                            <img :src="engineering_work_img">
                            <div id="competence-description-2">
                                <h3> Design Optimization </h3>
                                <p> We can run several iteration of structural analysis or leverage algorithms of toplogy optimization to find the most efficient design.</p>
                            </div>
                        </div>            
                        <div id="competence-container-3">
                            <img :src="additive_manufacturing_img">
                            <div id="competence-description-3">
                                <h3> Additive Manufacturing </h3>
                                <p> SLS printers are ready to produce your parts.</p>
                            </div>
                        </div> 
                </div>
                <div id="contact-section">
                    <div v-show="!isContactMode">
                        <div id="contact-wrapper">
                            <button @click="ContactUs"> Contact Us </button>
                            <div id="message"> 
                                <p> Reach out to us to discuss your needs!</p>
                            </div>   
                        </div> 
                    </div>
                    <div v-show="isContactMode && !isMessageSent">
                        <div id="post-form-container">
                            <form @submit.prevent="SendMessage">
                                <span> <b> Name </b> </span>
                                <input type="text" placeholder="Enter Name" v-model="name"/><br>
                                <label> <b> Surname </b> </label>
                                <input type="text" placeholder="Enter Surname" v-model="surname"/><br>
                                <label> <b> Email </b> </label>
                                <input type="email" placeholder="Enter Email" v-model="email"/><br>
                                <label> <b> Telephone </b> </label>
                                <input type="text" placeholder="Enter Telephone Number" v-model="telephone"/><br>
                                <label> <b>  Send us a message </b> </label>
                                <textarea placeholder="Your message ... " v-model="message"> </textarea><br>
                                <button id="save-button"> Send </button>
                            </form>
                        </div>
                    </div>
                    <div v-show="isMessageSent">
                        <div id="send-info">
                            <div id="message-info"> 
                                <h2> Your message has been successfully sent to us ! </h2>
                                <button id="home-button" @click="ReturnHome"> Return To Homepage </button>
                            </div>   
                        </div> 
                    </div>
                </div>
            </div>
        </div> 
    
        <div id="footer-wrapper">
            <h2> FastTopo Lab </h2>
            <p> Pictures are genereted by Gemini AI </p>
        </div>
</template>
<script>
import logo_color from "./Logo_color.jpg"
import logo_picture_color from "./logo-picture-color.jpg"
import digital_simulations_img from "./digital_simulations.jpg"
import engineering_work_img from "./engineering_work.jpg"
import additive_manufacturing_img from"./additive_manufacturing.jpg"
 
export default {
    name: 'App',
    data(){
        return {
            logo_color: logo_color,
            logo_picture_color: logo_picture_color,
            digital_simulations_img: digital_simulations_img,
            engineering_work_img: engineering_work_img,
            additive_manufacturing_img: additive_manufacturing_img,
            name: "",
            surname: "",
            email: "",
            telephone: "",
            messsage: "",
            isContactMode: false,
            isMessageSent: false
        }
    },
    methods: {
        ContactUs(){
            this.isContactMode = true
        },
        async SendMessage() {
            const payload = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                telephone: this.telephone, 
                message: this.message
            }
            const resJson = await this.UploadMessage(payload)
            console.log(resJson)
            this.isMessageSent = true
        },
        async UploadMessage(payload) {
            const res = await fetch('upload-message', {
                method: "POST",                 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            return await res.json()
        },
        ReturnHome() {
            this.isContactMode = false
            this.isMessageSent = false
        }
    }
}
</script>
<style>
body {
    margin: 0px;
}

#header-container {
    display: flex;
    justify-content: space-between;
    height: 70px;
    width: 80%;
    margin: auto;
    align-items: center;
}
#header-container button {
    width: 100px;
    height: 60px;
    border: 2px solid black;
    border-radius: 12px;
    background-color: rgb(235, 129, 30);
    font-size: 18px;
    font-weight: bold;
    color: white;
}
#logo-container {
    display: flex;
    height: 70px;
    margin-left: 10px;
}

#button-container {
    margin-right: 10px; 
}


#header-links {
    display: flex;
    width: 300px;
    justify-content: flex-end;
    color: rgb(235, 129, 30);
    font-size: 20px;
}
#main-section-wrapper {
    display: flex;
}

#main-section-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 15px auto;
    background-color: rgb(192, 215, 237);
}

#main-body {
    display: flex;
}

#main-section-container img {
    width: 100px;
}

#main-section-container h2 {
    font-size: 32px;
    padding-left: 30px;
    color: rgb(61, 61, 164);
}

#main-section-container h3 {
    font-size: 18px;
    padding-left: 40px;
}

#header-links h3 {
    margin: auto 10px auto 10px;
}

#competence-wrapper {
    margin-top: 15px;
    padding-left: 10px;
    width: 60%;
}
#competence-container-1 {
    background-color: white;
    width: 95%;
    margin-bottom: 15px;
    padding-left: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}

#competence-container-2 {
    background-color: white;
    width: 95%;
    margin-bottom: 15px;
    padding-left: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}
#competence-container-3 {
    background-color: white;
    width: 95%;
    margin-bottom: 35px;
    padding-left: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
} 

#competence-container-1 img {
    height: 120px;
    width: auto;
}
#competence-container-2 img {
    height: 120px;
    width: auto;
}
#competence-container-3 img {
    height: 120px;
    width: auto;
}

#competence-container-1 h3 {
    color: darkgreen;
    font-size: 22px;
}

#competence-container-2 h3 {
    color: darkblue;
    font-size: 22px;
}
#competence-container-3 h3 {
    color: darkorange;
    font-size: 22px;
}

#competence-description-1 {
    width: 70%
}
#competence-description-2 {
    width: 70%
}
#competence-description-3 {
    width: 70%
}

#contact-section {
    margin-top: 15px;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#contact-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#contact-section button {
    width: 200px;
    height: 60px;
    border: 2px solid black;
    border-radius: 12px;
    background-color: rgb(235, 129, 30);
    font-size: 18px;
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
}

#contact-section button:hover {
    cursor:pointer
}

#message {
    background-color: white;
    border-radius: 10px;
    padding:8px;
}
#post-form-container {
    display: flex;
    margin-left: 20px;
    height: 100%;
    width: 100%;
}

#post-form-container textarea {
    width: 400px;
    height: 200px;
}
#post-form-container input,label {
    display:flex;
}

#footer-wrapper {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#footer-wrapper h2 {
    color:rgb(235, 129, 30);
    font-style: italic;
    font-weight: bold;
}

#footer-wrapper p {
    font-size: 10px;
}
</style>