/**
 *  All data interface APIs
 */

import Urls from './urls';
import {Persistence} from './persistence';
import axios from 'axios';

class DemoService {
    /**
     * 
     */
    constructor() {
    }
    /**
     * 
     */
    getBearerHeader() {
        return{
            'Authorization': 'Bearer  ' + new Persistence().get('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    /**
     * 
     * @param {String} email 
     * @param {String} password 
     */
    login(email, passwd) {
        const params = {email, passwd};
        return axios.post(Urls.BASE + '/signin.json', params);
    }
    /**
     * 
     * @param {*} email 
     * @param {*} name 
     * @param {*} password 
     */
    signup(email, name, passwd) {
        const params = {email, name, passwd};
        return axios.post(Urls.BASE + '/signup.json', params);
    }
    /**
     * 
     * @param {*} email 
     */
    forgotPassword(email) {
        const params = {email};
        // return axios.post(Urls.APP + '/forgot.json', params);
    }

    /**
     * 
     * @param {*} email 
     * @param {*} pin 
     * @param {*} token 
     * @param {*} password 
     */
    updatePassword(email, pin, token, password) {
        // const params = {email: email};
        // return axios.post(Urls.APP + '/update_password.json', params);
    }

    /**
     * 
     * @param {*} page (number)
     */
    getUsersPage(page) {
        return axios({ 
            url: Urls.BASE + '/users/list.json',
            method: 'get',
            crossdomain: true,
            headers: this.getBearerHeader()
        });
    }

    /**
     * 
     * @param {*} id (string)
     */
    getUser(id) {
        return axios.get(Urls.BASE + '/users/' + id + '.json',  { headers: this.getBearerHeader() });
    }

    /**
     * 
     * @param {*} id (string)
     * @param {*} name (string)
     */
    updateUser(id, name) {
        const params = {name: name};
        return axios.put(Urls.BASE + '/users/' + id + '.json', params, { headers: this.getBearerHeader() });
    }

    /**
     * 
     * @param {*} email (string)
     * @param {*} name (string)
     */
    createUser(email, name) {
        const params = {email: email, name: name};
        return axios.post(Urls.BASE + '/users.json', { headers: this.getBearerHeader() });
    }

    /**
     * 
     * @param {*} id (string)
     */
    deleteUser(id) {
        return axios.delete(Urls.BASE + '/users/' + id + '.json',  { headers: this.getBearerHeader() });
    }

}
export {DemoService};
