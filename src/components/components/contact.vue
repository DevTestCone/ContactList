<template>
<div>
  <h4>Add Contact: </h4>
  <div class="card contact__add">
    <div>
      <input v-model="addContactData.Contact_id" class="validate" placeholder="Id" type="text">
    </div>
    <div>
      <input v-model="addContactData.Name" class="validate" placeholder="name" type="text">
    </div>
    <div>
      <input v-model="addContactData.Surname" class="validate" placeholder="surname" type="text">
    </div>
    <div>
      <input v-model="addContactData.Phone" class="validate" placeholder="phone" type="text">
    </div>
    <div>
      <i @click="addContact" class="material-icons small">add</i>
    </div>
  </div>
  <h4>Contacts:</h4>

  <div v-for="contact in sort_contact" v-bind:key="contact.Contacts_id" class="collection">
    <div class="collection-item contact__list">
      <div> {{"# "+contact.Contacts_id}} </div>
      <div> {{contact.Name + " " + contact.Surname}} </div>
      <div> {{contact.Phone}} </div>
    </div>
  </div>
</div>
</template>

<script>
import db from '@/db'

export default {
  name: 'contact',
  data() {
    return {
      contacts: [],
      addContactData: {
        Contacts_id: '',
        Name: '',
        Surname: '',
        Phone: ''
      }
    }
  },
  computed: {
    sort_contact() {
      return this.contacts.slice().sort((a, b) => {
        return a.Contacts_id - b.Contacts_id;
      })
    }
  },
  created() {
    this.getContact();
  },
  methods: {
    getContact() {
      db.collection('Contacts').get().then(querySnapshot => {
        const contacts = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          contacts.push(doc.data())
        });
        this.contacts = contacts
      });
    },
    addContact() {
      db.collection('Contacts').add(this.addContactData).then(this.getContact)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contact__list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
}

.contact__add {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
}

.contact__add div {
  padding-left: 5px;
}
</style>
