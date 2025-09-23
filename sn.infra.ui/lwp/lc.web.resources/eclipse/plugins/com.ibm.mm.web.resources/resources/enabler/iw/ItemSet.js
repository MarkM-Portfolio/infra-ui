/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.ItemSet");

dojo.declare("com.ibm.mm.enabler.iw.ItemSet", null, 
{    
            constructor:function(){
            // summary: ItemSet; interface to a simple abstraction of a datastore. This provides a base from which more sofisticated data stores can be built.
            },
            setItemValue: function( /*String*/ itemName, /*Object*/ value,/*boolean*/readOnly ){          
            //summary:  this method sets an item within the ManagedItemSet, creates or replaces an existing entry as needed
            //    To append a value to any existing item, suggest to get the current value of this item and append
            //    the new value to the list and supply the result to this method.
            //    Marking an item as ReadOnly indicates to the iContext that while this item maybe shared with other components
            //    on the page, the access of those components should not include changing or removing item.
            //itemName: name of the item
            //value: value of the item
            //readOnly: boolean attribute to indicate this item is readOnly or not
                 return this; /*ItemSet @return an handle ItemSet upon successful, null upon failure*/  
            }, 

            getItemValue: function( /*String*/ itemName ){   
            //summary:         
            // This method returns the value for the named item from the set. 
            // itemName: name of required item        
                 return null;/*Object @return the named item for the set, null upon failure*/
            }, 

            getAllNames: function (){
            //summary:    This method returns an array of strings,providing the name each item currently in the set. If 
                return null;/*String[] @return an array of items names and return null if the set contains no item*/
            },

            removeItem: function(/*String*/itemName){          
            //summary:  removes the named item from the set. 
            //itemName: name of the item that needs to be removed         
               return null; /*ManagedItemSet @return the handle to the ManagedItemSet upon successful, null upon failure*/       
            },

            clone: function (){
            //summary:  this method returns a new ItemSet which is a duplicate of the current ItemSet  
                 return null; /*ManagedItemSet @return a new ItemSet which contains all the data item in the current ItemSet */ 
            }, 

            isReadOnly: function(/*String*/itemName){
            //summary:  This method returns a boolean indicating whether or not the item specified by the supplied name can be modified by the user
            //itemName: name of the required Item         
                 return null;/*Boolean @return a boolean indicating whether or not the item specified by the supplied name can be modified by the user */        
            },
            getItemSetDescription:function(){
            //summary: This method returns ItemSetDescription if one exists, otherwise return null
                 return null;/*null @return As a limitation in V1, this method returns null */
            }
});

dojo.declare("com.ibm.mm.enabler.iw.ManagedItemSet",com.ibm.mm.enabler.iw.ItemSet,{
            constructor:function(){
            // summary: ManagedItemSet; interface to a simple abstraction of a datastore. This provides a base from which more sofisticated data stores can be built.
            },
             save: function(callbackfn){
             //summary:This method requests the iContext save the current state of the ManagedItemSet. 
             //  The iContext MAY also choose to save the ManagedItemSet at times other than when iWidgets request a save. 
             //  This method MAY operate asynchronously.  The iContext  MUST invoke any supplied callbackFn upon completion of the save attempt. 
             // need to be implemented by each subclass...signiture of callback function is as follows
             // function(in String managedItemSetName, in boolean success);
             //callbackfn: optional, callback function             
            }
});
