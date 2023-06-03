import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
  styleUrls: ['./flagged-items.component.css']
})
export class FlaggedItemsComponent implements OnInit {
  flaggedItemsCollection: AngularFirestoreCollection<FlaggedItem>;
  flaggedItems: Observable<FlaggedItem[]>;

  constructor(private firestore: AngularFirestore) { 
    this.flaggedItemsCollection = this.firestore.collection<FlaggedItem>('flaggedItems');
    this.flaggedItems = this.flaggedItemsCollection.valueChanges();
  }

  approveItem(item: FlaggedItem) {
    // Update the 'approved' field to true
    this.flaggedItemsCollection.doc(item.id).update({ approved: true });
  }
  
  rejectItem(item: FlaggedItem) {
    // Update the 'approved' field to false
    this.flaggedItemsCollection.doc(item.id).update({ approved: false });
  }

  ngOnInit() {
    this.flaggedItemsCollection = this.firestore.collection<FlaggedItem>('flaggedItems');
    this.flaggedItems = this.flaggedItemsCollection.valueChanges();
  }
}
