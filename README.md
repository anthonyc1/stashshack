# Stash Shack

## Inspiration
After going to the Cisco Meraki workshop we started brainstorming about how businesses could use the Meraki Access Point (AP) bluetooth functionality to increase traffic. The APs can be used as bluetooth beacons to send links to any bluetooth enabled device in proximity of the AP. We concluded that raffles or games would be a good way for stores or cafes to increase interest.

## What it does
Anyone with a bluetooth enabled device that has the Piper app installed will receive an invite (a link) to the game. The user will be prompted to enter their phone number and a verification code that will be sent to their phone. Once verified, the user can participate in the particular raffle/game they were invited to. Winners would then be able to redeem special offers or prizes from the particular business they are visiting. This would provide incentive for users to visit the physical location and would increase foot traffic and sales.

## How we built it
We used the Meraki AP provided as a bluetooth beacon and used Piper to create custom notifications attached to that particular beacon. These notifications link to our web app which we built using node.js, express.js, and mongodb. We also developed a two-step phone number verification using the nexmo api which allow us to identify unique visitors.

## Challenges we ran into
We struggled with setting up the AP as a beacon and getting Piper to receive the notification from the beacon as this was a technology that none of us were familiar with. We also learned to set up a mongodb database using node for the two-step phone number verification.

## Accomplishments we are proud of
Developing a full stack JS application, successfully performing two-step phone verification, and getting our Meraki AP beacon to work with any bluetooth device.

## What's next for Stash Shack
Our plan is to create a standalone app and remove the Piper app as the middleman between the bluetooth beacon and our service. We tried looking into creating an app that would register the UUID from the beacon and notify the customer itself but quickly realized that this would be unrealistic in this short of a timeframe. Our next step would be to actually create such a standalone app.

## Check us out at Devpost!
[https://devpost.com/software/stash-shack](https://devpost.com/software/stash-shack)