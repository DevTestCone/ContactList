<template>
<div>
  <h4>Add Contact: </h4>
  <div class="card contact__add">
    <div>
      <input v-model="addContactData.Contacts_id" class="validate" placeholder="Id">
    </div>
    <div>
      <input v-model="addContactData.Name" class="validate" placeholder="name">
    </div>
    <div>
      <input v-model="addContactData.Surname" class="validate" placeholder="surname">
    </div>
    <div>
      <input v-model="addContactData.Phone" class="validate" placeholder="phone">
    </div>
    <div>
      <i @click="addContact" class="material-icons small">add</i>
    </div>
  </div>
  <h4>Contacts:</h4>

  <div v-for="contact in sort_contact" v-bind:key="contact.Contacts_id" class="collection">
    <div v-if="editId === contact.Contacts_id" class="collection-item contact__list" :class="{'grey lighten-4': editId === contact.Contacts_id}">
      <div><strong>{{"# "+contact.Contacts_id}}</strong> </div>
      <div>
        <input class="validate" v-model="editContactData.Name" />
      </div>
      <div>
        <input class="validate" v-model="editContactData.Surname" />
      </div>
      <div>
        <input class="validate" v-model="editContactData.Phone" />
      </div>
      <i @click="editContactCheck" class="material-icons small">check</i>
      <i @click="editContactCancel" class="material-icons small">cancel</i>
    </div>
    <div v-else class="collection-item contact__list">
      <div><strong>{{"# "+contact.Contacts_id}}</strong> </div>
      <div> {{contact.Name + " " + contact.Surname}} </div>
      <div> {{contact.Phone}} </div>
      <div>
        <i @click="editContact(contact)" class="material-icons small">mode_edit</i>
        <i @click="deleteContact(contact.Contacts_id)" class="material-icons small">delete</i>
      </div>
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
      },
      editId: '',
      editContactData: {
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
        return a.Contacts_id - b.Contacts_id
      })
    }
  },
  created() {
    this.getContact()
  },
  methods: {
    getContact() {
      db.collection('Contacts').get().then(querySnapshot => {
        const contacts = [];
        querySnapshot.forEach(doc => {
          //console.log(doc.data())
          contacts.push(doc.data())
        })
        this.contacts = contacts
        // console.log(contacts);
      })
    },
    addContact() {
      db.collection('Contacts').add(this.addContactData).then(this.getContact)
    },
    deleteContact(Contacts_id) {
      db.collection('Contacts')
        .where('Contacts_id', '==', Contacts_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(this.getContact())
          })
        })
    },
    editContact(contact) {
      this.editId = contact.Contacts_id
      this.editContactData.Name = contact.Name
      this.editContactData.Surname = contact.Surname
      this.editContactData.Phone = contact.Phone
    },
    editContactCancel(){
      this.editId = ''
      this.editContactData.Name = ''
      this.editContactData.Surname = ''
      this.editContactData.Phone = ''
    },
    editContactCheck(){
      db.collection('Contacts')
        .where('Contacts_id', '==', this.editId).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.set({
              Contacts_id: this.editId,
              Name:this.editContactData.Name,
              Surname: this.editContactData.Surname,
              Phone: this.editContactData.Phone
            }).then(this.getContact())
          })
          this.editContactCancel()
        })
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
  justify-content: space-around;
  border: 1px solid black;
}

.contact__add div {
  padding-left: 5px;
}

.material-icons {
  cursor: pointer;
  padding-left: 5px;
}
</style>
