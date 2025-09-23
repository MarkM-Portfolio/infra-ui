#/* ***************************************************************** */
#/*                                                                   */
#/* IBM Confidential                                                  */
#/*                                                                   */
#/* OCO Source Materials                                              */
#/*                                                                   */
#/* Copyright IBM Corp. 2012                                          */
#/*                                                                   */
#/* The source code for this program is not published or otherwise    */
#/* divested of its trade secrets, irrespective of what has been      */
#/* deposited with the U.S. Copyright Office.                         */
#/*                                                                   */
#/* ***************************************************************** */
cssRoot="resources/css"
css="${cssRoot}/images"

files=`find ${css} -type f -iname "*.css"`

otherCss="other.css"
otherCssRTL="otherRTL.css"
newCss="${cssRoot}/sprites.css"
newCssRTL="${cssRoot}/spritesRTL.css"

if [ -f ${newCss} ] ; then
	rm ${newCss}
fi

if [ -f ${newCssRTL} ] ; then
	rm ${newCssRTL}
fi

cat ${otherCss} >> ${newCss}
cat ${otherCssRTL} >> ${newCssRTL}

for f in ${files} ; do
	sed "s/\/\*.*//g" ${f} >> ${newCss}
	sed "s/\/\*.*//g" ${f} >> ${newCssRTL}
	
	fullPath=${f%/*}
	relPath=${fullPath##resources/css}
	oldPNG=`cat ${f} | grep "url('./" | sed "s/.png.*/.png/g" | sed "s/.*url('.//g"`
	
	sed -i -e "s,${oldPNG},${relPath}\/${oldPNG#*/},g" $newCss
	sed -i -e "s,${oldPNG},${relPath}\/${oldPNG#*/},g" $newCssRTL
done

sed -i -e '/^$/d' $newCss
sed -i -e '/^$/d' $newCssRTL

cd ${cssRoot}
rm *.css-e