#!/bin/sh
# ***************************************************************** 
#                                                                   
# Licensed Materials - Property of IBM                              
#                                                                   
# 5724-S68                                                          
#                                                                   
# Copyright IBM Corp. 2015  All Rights Reserved.                    
#                                                                   
# US Government Users Restricted Rights - Use, duplication or       
# disclosure restricted by GSA ADP Schedule Contract with           
# IBM Corp.                                                         
#                                                                   
# ***************************************************************** 

# TODO: FIXME: Get rid of this and hook it into Dojo's general build script
# You must have mtasc to run this
mtasc -trace DojoExternalInterface.trace -main -cp ../flash -swf Storage.swf -version 8 -header 215:138:10 Storage.as
