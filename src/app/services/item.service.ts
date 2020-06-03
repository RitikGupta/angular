import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument} 
from 'angularfire2/firestore'
import { Observable } from "rxjs";
import{ of } from 'rxjs';

import 'rxjs/add/operator/map'

import { Item } from "../models/item";


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  

  constructor(public afs: AngularFirestore) { 
   // this.items = this.afs.collection('items').valueChanges();

   this.itemsCollection = this.afs.collection('items');

   this.items = this.afs.collection('items').snapshotChanges().map(changes => {
     return changes.map(a =>{
       const data = a.payload.doc.data() as Item;
       data.id = a.payload.doc.id;
       return data;
     })
   })
  }

  getItems(){
    return this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item);
  }

}

