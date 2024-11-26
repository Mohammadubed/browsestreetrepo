const verifyEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const verifyName = (name) => {

    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

export default function verify(type,value){
    const dic = {
        'email': verifyEmail,
        'name':verifyName
    }

    return dic[type](value);
}
