/* *************************************************************************************/
/* Complete script for management of XMLHttpRequest                                    */
/* From Sébastien de la Marck (aka Thunderseb)                                         */
/* *************************************************************************************/

function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Your navigator doesn't support the XMLHTTPRequest object...");
		return null;
	}
	
	return xhr;
}
