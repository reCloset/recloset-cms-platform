import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collectionData, collection as firestoreCollection } from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

interface FlaggedItem {
  name: string;
  imageUrls: string[];
  approved: boolean;
  id: string;
}

@Component({
  selector: 'app-flagged-items',
  templateUrl: './flagged-items.component.html',
  styleUrls: ['./flagged-items.component.scss']
})
export class FlaggedItemsComponent implements OnInit {
  flaggedCollection: CollectionReference<DocumentData>;
  flaggedItem$: Observable<DocumentData[]>;

  constructor(@Inject(Firestore) private firestore: Firestore) { 
    this.flaggedCollection = firestoreCollection(this.firestore, 'flaggedItems')
    this.flaggedItem$ = collectionData(this.flaggedCollection)
  }

  async approveItem(item: FlaggedItem) {
    const flaggedItemDoc = doc(this.firestore, 'flaggedItems', item.id);
    await deleteDoc(flaggedItemDoc);
    
    const approvedItemsCollection = firestoreCollection(this.firestore, 'approvedItems');
    const approvedItemDoc = doc(approvedItemsCollection);
    await setDoc(approvedItemDoc, item);  
  }
  
  async rejectItem(item: FlaggedItem) {
    const flaggedItemDoc = doc(this.firestore, 'flaggedItems', item.id);
    await deleteDoc(flaggedItemDoc);
  }

  ngOnInit() {
  }
}
