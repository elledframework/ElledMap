The 'country'_Popup.htm files (and by extension, the graphics on the webpage) are editable without any html, css or JS experience. 


UPDATING POPUPS
To update the text appearing in the popup window for a country, right click on the 'country'_Popup.htm file in the countries respective folder, for example Canada_Popup.htm. When right clicking the file, select open with> Microsoft excel. The file can now be styled however you see fit, including adding links, changing font/ text size, updating statistics, bold/ italic, background color (careful changing colors though it will look strange), resizing cells etc..
Saving Changes to popup Window:
1. WHEN FINISHED MAKING CHANGES, SELECT SAVE AS> WEB PAGE (HTM FILE) AND SELECT SHEET (NOT ENTIRE WORKBOOK). 
2. Once the file is saved, a final edit must be done so the links will work. Right click the file and select open with>(any text editor e.g notepad, notepad++, textedit, textmate etc..). 
3. The HTML script will appear, directly under where it says <head> (should be around line 7) copy in the following on its own line: <base target ="_blank">
4. Be careful not to delete any existing script in the htm file, If you do - repeat from step 1, and it will overwrite anyways, no worries :)

