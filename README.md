Phillys Roll 20 Scripts
=======================

Mob Importer
------------
First you need to create a macro that is used to fire the script when needed. Make a macro its name can be what you want. I call mine Mob-Importer

Then in the macro itself use this

`!CreateMob ?{ShowSkills}`

I set these so they are on my bar but thats up to you. 

To import a mob these are the steps. Make sure you have a mob. An example is here. http://paizo.com/PRD/monsters/goblin.html
You would copy from the name in black to the ecology block. But no further or it wont work right and the script will botch.

  * Create a token
  * Next go to the Pathfinder PRD (the offical one) and copy the stat block.
  * Copy paste the stat block into the game master notes field on the token itself. You will know if this works if its perfectly readible. If things look scattered it means you copied to much. Just copy from the mob name to the end of the stat block itself you do not want any of the description.
  * Now hit the createmob macro button you created for this script. You can hit n for skills if u want to save space.
  * HP AC and Movement will appear above its head along with the monsters name.
  * click off the creature then back on to see the macros automatically created for it. 
  * Next you will have a new character in your character and handouts page. You can archive this new character which will be the name of the mob. If you delete it the macros for it will vanish as well. This character is needed to store the macros but they can be safely archived.
  * Test the macros since the script is not full proof. It will mess up from time to time but normally does a good job.

**Note: You can also use the hero lab basic text output for this as well**


Create Light
------------

This script allows you to quickly add light to a character. It doenst do anything special its just a quick way to add light to a character.

Macro needed

`!CreateSight ?{MaxFallout}`

To use this macro a token needs to be selected. It has 3 variables. Maximum Distance then Fallout Start and if its visible by everyone.

To make a torch with a 30 foot range with 15 falloff that everyone can see u will select the character hit the macro and enter in the popup box "30 15 y"

If you just want to set the sight just leave the y off.

Round Tracker Script
--------------------

This requries 2 macros. One to start combat after everyone has entered thier init. The next is to clear the initiative quickly.

Create a new macro called Clear or ClearInit it doesnt really matter. for the script use this.

`!clearInit`

I set it so its always on my bottom bar.

The other macro is to start the round tracker. This will automatically sort everything and start the round. No need to go and sort things.

`!startInit`

I also make it on the bottom bar as well. makes it easy to begin and end combat quickly.



