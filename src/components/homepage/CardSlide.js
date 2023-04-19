import React from "react";
import { useState, useEffect } from "react";
export default function CardSlide() {
  const [index, setIndex] = useState(0);
  const interval = 7000;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((index + 1) % cards.length);
    }, interval);
    return () => clearInterval(timer);
  }, [index]);

  const names = [
    "Katherine Pickett",
    "Randy Santa-Ana",
    "Tomislav Crnkovic",
    "Joanne Kelk",
    "Luke Gentile",
  ];
  const cards = [
    "We came back to Jay for another haircut and I'm glad to say that he is still offering the same exceptional  service. It's obvious he loves his job and talking to people. He took time to show my son how to style his hair and introduced us to some hair product that is much nicer for my son to use on his own. He is very patient with children. Thank you!",
    "A superb barber shop that everyone should know about!  It was my first time trying out their service and I am very particular with the style that I want my hair to be cut, and I was not disappointed!  This barber shop is run by a couple of really nice and very skilful gentlemen.  The reviews do not lie; Jay and Elbert do deliver excellent service!  I had a smile on my face when Elbert finished the hair cut that i wanted and will definitely be coming back!",
    "Jay and the staff at Romantiko have been awesome. They have been very friendly to m and my family (I have taken my 4 year old son there twice for cuts and they have done fantastic with kids) and I have gone myself a handful of times already since moving to Airdrie. Jay does his best to manage the busy times and is always nice to everyone even if they need to wait. Most importantly Jay and everyone else there do great haircuts, trims etc and listen us well. Finally their shop is really cool, great atmosphere and now has a pool table which is wonderful for anyone who's waiting to pass the time. I'm always going to Jay and Romantiko!",
    "Decided to try this place based off of a google search and reading reviews- was not disappointed! My son (11) usually gets a haircut before school starts, then grows it out for the rest of the year. This year he decided that he did not want it all cut off, but wanted to keep his longer hair. I was concerned about how “grown out” hair would look after a trim, but Jay did a fabulous job. Lots of layering, great shape, and his curls are bouncing back at the ends. Will definitely be back for his next cut. Reasonable price too.",
    "I received an excellent cut today from a young man named Cesar. (Extremely talented young man). I am Overly satisfied with not only my new hairstyle but the experience as a whole. The atmosphere in the shop was very relaxed but professional. I enjoyed the music and having the pool table there really sets the mood as a place where you want to get a haircut.",
  ];

  return (
    <div className="reviewCards">
      {cards.map((card, i) => (
        <div
          key={i}
          className="review"
          style={{ display: i === index ? "block" : "none" }}
        >
          <p>
            <span className="quotationMark">"</span>
            {card}
            <span className="quotationMark">"</span>
          </p>

          {names.map((name, i) => (
            <div key={i} style={{ display: i === index ? "block" : "none" }}>
              <h2>- {name}</h2>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
