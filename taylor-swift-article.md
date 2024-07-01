# Taylor Swift Article 
This example project illustrates Awarenesses ability to reason over long documents. We'll use the main Wikipedia article for Taylor Swift which is around 250k tokens in length. We'll ask Awareness to perform summarization and retrieval tasks that are difficult for the current RAG based solutions to do. 

## Project Dataset
The dataset for this project is the main Taylor Swift article on Wikipedia. That page is around 250k tokens or twice the size of GPT-4o's context window. If you want to unleash your inner Swifty you can add in the various Taylor Swift related sub-articles (her discography, filmography, performances, etc.) and push the corpus to well over 1m tokens. 

```
https://en.wikipedia.org/wiki/Taylor_Swift
```

## Example Questions & Answers
To evaluate the projects dataset we're going to use GPT-4o. The example Q&A pairs below are as of early July 2024 and cost around $1.25 per query.

Let's start with a simple needle in a haystack query:

```
Q: what's special about track 5 on her albums?
A: Track 5 on Taylor Swift's albums is noted by critics as the most "emotionally vulnerable" song on each album.
```

That is correct as noted by [this citation](https://en.wikipedia.org/wiki/Taylor_Swift#cite_ref-330).

Now lets ask Awareness to generate a summary of the document:

```
Q: summarize the article
A: The article provides a comprehensive overview of Taylor Swift's life, career, and achievements. Born on December 13, 1989, in West Reading, Pennsylvania, Swift began professional songwriting at 14 and signed with Big Machine Records in 2005. She gained prominence with her country pop albums "Taylor Swift" (2006) and "Fearless" (2008) and later transitioned to pop with "1989" (2014). Swift's discography includes a variety of musical styles, with notable albums like "Reputation" (2017), "Lover" (2019), "Folklore" (2020), "Evermore" (2020), "Midnights" (2022), and "The Tortured Poets Department" (2024).

Swift has re-recorded her first six studio albums due to a dispute with Big Machine Records. Her "Eras Tour" (2023–2024) became the highest-grossing tour of all time. She has directed several music videos and films, earning critical acclaim and numerous awards, including 14 Grammy Awards, a Primetime Emmy Award, and 40 American Music Awards. Swift is one of the world's best-selling artists, with 200 million records sold worldwide as of 2019, and she is the highest-grossing female touring act.

Swift has been recognized on various influential lists, including Rolling Stone's "100 Greatest Songwriters of All Time" and Forbes' "World's 100 Most Powerful Women." She was named Time Person of the Year in 2023 for her cultural impact. Swift's music and public image have made her a significant figure in global celebrity culture, and she is often described as a pop icon with a profound impact on the music industry and popular culture.
```

That's admittedly a pretty underwhelming summary, given the length of the source article, but the thing to understand is that this is a really challenging task in multiple ways:

- There's no similarity between the query "summarize the article" and the text of the document so RAG based semantic retrieval isn't going to help you as there aren't any chunks in the vector db that are relevant.
- You have no choice but to reason over the entire document but in this case it's too big to fit in the models context window.

Your choices currently are to either use a model with a larger context window, like Google Gemini Pro, use Awareness to distribute the task over multiple model calls, or use a bespoke bit of code to apply a recursive summarization algorithm to the article (that's not what Awareness is doing BTW.)

Let's see if we can improve the quality of this summary... Let's first retrieve the structure of the document:

```
Q: return a list of the section headers in the article
A: 1. Life and career
   - Early life
   - 2004–2008: Career beginnings and first album
   - 2008–2010: Fearless
   - 2010–2014: Speak Now and Red
   - 2014–2018: 1989 and Reputation
   - 2018–2021: Lover, Folklore, and Evermore
   - 2021–2023: Re-recordings and Midnights
   - 2023–present: The Eras Tour and The Tortured Poets Department
2. Artistry
   - Musical styles
   - Voice
   - Songwriting
   - Performances
   - Video and film
3. Accolades and achievements
4. Cultural status
   - Legacy
   - Entrepreneurship
   - Social activism
5. Wealth
6. Philanthropy
7. Discography
8. Filmography
9. Tours
10. See also
11. Footnotes
12. References
   - Cited literature
13. External links
```

Armed with that knowledge we can use Awareness to dive into subsections of the document:

```
Q: return a summary of taylors life and career
A: Taylor Alison Swift, born on December 13, 1989, in West Reading, Pennsylvania, is an American singer-songwriter, musician, producer, director, and actress. She began professional songwriting at 14 and signed with Big Machine Records in 2005. Swift gained prominence with her country pop albums "Taylor Swift" (2006) and "Fearless" (2008), featuring hit singles like "Teardrops on My Guitar," "Love Story," and "You Belong with Me."

Swift's musical evolution saw her experimenting with rock on "Speak Now" (2010) and electronic styles on "Red" (2012), which included her first Billboard Hot 100 number-one single, "We Are Never Ever Getting Back Together." She transitioned to pop with the synth-pop album "1989" (2014), producing chart-toppers like "Shake It Off," "Blank Space," and "Bad Blood." Her hip-hop-influenced album "Reputation" (2017) followed, inspired by media scrutiny.

After signing with Republic Records in 2018, Swift released the eclectic pop album "Lover" (2019) and the documentary "Miss Americana" (2020). She explored indie folk with "Folklore" and "Evermore" in 2020, and subdued pop with "Midnights" (2022) and "The Tortured Poets Department" (2024). Swift re-recorded four of her albums subtitled "(Taylor's Version)" following a dispute with Big Machine Records.

Swift's "Eras Tour" (2023–2024) became the highest-grossing tour of all time. She has directed films and videos, including "Folklore: The Long Pond Studio Sessions" (2020) and "All Too Well: The Short Film" (2021). As one of the world's best-selling artists, she has sold 200 million records worldwide as of 2019 and is the second most-streamed artist on Spotify. Swift is the highest-grossing female touring act and the first billionaire with music as the main source of income.

Her accolades include 14 Grammy Awards, a Primetime Emmy Award, 40 American Music Awards, 39 Billboard Music Awards, and 23 MTV Video Music Awards. Swift has won the Grammy Award for Album of the Year, the MTV Video Music Award for Video of the Year, and the IFPI Global Recording Artist of the Year a record four times each. She was named the 2023 Time Person of the Year and has appeared on numerous prestigious lists, including Rolling Stone's "100 Greatest Songwriters of All Time" and Forbes' "World's 100 Most Powerful Women."

Swift's early life included performing in local theater productions and traveling to New York City for vocal and acting lessons. Influenced by country artists like Shania Twain and Faith Hill, she moved to Nashville at 14 to pursue a music career. Her father transferred to Merrill Lynch's Nashville office to support her ambitions. Swift attended Hendersonville High School and later Aaron Academy, graduating a year early to accommodate her touring schedule.

Throughout her career, Swift has been recognized for her influence on the music industry, her strategic business moves, and her ability to engage her fanbase with intricate narratives and "Easter eggs" in her music and videos. She has also been involved in significant cultural moments and has received praise from legendary musicians for her songwriting and influence.
```

Notice how much better that summary is then the original one. Awareness generates much better answers when its given something to focus on. The closest analogy we have for what Awareness is doing under the hood is that it's like giving the model a pair of reading glasses. Awareness can help the model focus on the specific details needed to answer a question or perform a task but you need to tell it what to look at.

Another example, we can get the model to generate a detailed timeline of events but you need to be specific with what events should go in the timeline:

```
Q: create a timeline of taylors cash donations
A: Here is a timeline of Taylor Swift's cash donations:

1. **August 9, 2009**: Donated $100,000 to victims of the Iowa Flood.
2. **May 7, 2010**: Donated $500,000 after Nashville floods.
3. **May 23, 2011**: Benefit concert raised more than $750,000 for tornado victims.
4. **June 13, 2011**: Donated $25,000 to St. Jude Children's Research Hospital, Tennessee.
5. **June 13, 2011**: Taylor Swift and ACM Lifting Lives presented a $50,000 donation to St. Jude.
6. **June 2014**: Donated $50,000 to CHOP to help teens with cancer.
7. **December 16, 2013**: Donated $100,000 to the Nashville Symphony.
8. **May 17, 2012**: Donated $4 million to the Country Hall of Fame.
9. **December 9, 2016**: Donated $100,000 to the Dolly Parton Fire Fund.
10. **December 9, 2016**: Donated $1 million to Louisiana flood relief efforts.
11. **September 4, 2019**: Made a "very sizeable donation" to a food bank in Houston after Hurricane Harvey.
12. **March 5, 2020**: Donated $1 million for Tennessee tornado relief.
13. **August 20, 2020**: Cash gift helped a student take up a degree.
14. **December 11, 2023**: Donated $1 million to help communities ravaged by Tennessee tornadoes.
15. **February 16, 2024**: Donated $100,000 to the family of a woman killed at the Chiefs' parade.
16. **February 2024**: Donated $100,000 to the family of a woman who died in a shooting at the Kansas City Chiefs' Super Bowl parade.
```

We'll finish with another retrieval task. This article has almost 600 citations with links to external references. That's way more links then can fit in a single context window so the preview bits can't return them all (we're working on that.) We can ask for a range of those citations though and Awareness will accurately return them all:

```
Q: return the archive links for reference 200 - 219
A: Here are the archive links for references 200 to 219:

- Reference 200: [Archived](https://web.archive.org/web/20221022001540/https://www.theguardian.com/music/2022/oct/21/taylor-swift-midnights-review-small-hours-pop-rich-with-self-loathing-and-stereotype-smashing) from the original on October 22, 2022.
- Reference 201: [Archived](https://web.archive.org/web/20240211011818/https://www.wsj.com/articles/midnights-review-taylor-swift-jack-antonoff-anti-hero-single-11666647508) from the original on February 11, 2024.
- Reference 202: [Archived](https://web.archive.org/web/20230430000907/https://www.billboard.com/lists/taylor-swift-biggest-accomplishments-2022/) from the original on April 30, 2023.
- Reference 203: [Archived](https://web.archive.org/web/20221031010926/https://consequence.net/2022/10/taylor-swift-midnights-records/) from the original on October 31, 2022.
- Reference 204: [Archived](https://web.archive.org/web/20231026233157/https://www.billboard.com/music/chart-beat/morgan-wallen-last-night-taylor-swift-ice-spice-karma-hot-100-top-10-1235345987/) from the original on October 26, 2023.
- Reference 205: [Archived](https://web.archive.org/web/20221229182624/https://www.billboard.com/pro/top-earning-musicians-rolling-stones-swift-us-money-makers/) from the original on December 29, 2022.
- Reference 206: [Archived](https://web.archive.org/web/20221230175252/https://www.billboard.com/pro/top-earning-musicians-taylor-swift-bts-global-money-makers-2021/) from the original on December 30, 2022.
- Reference 207: [Archived](https://web.archive.org/web/20221121080436/https://www.billboard.com/music/awards/2022-amas-records-winners-1235174479/) from the original on November 21, 2022.
- Reference 208: [Archived](https://web.archive.org/web/20220829031951/https://pitchfork.com/news/taylor-swift-breaks-record-for-most-video-of-the-year-wins-at-2022-vmas/) from the original on August 29, 2022.
- Reference 209: [Archived](https://web.archive.org/web/20230913222023/https://www.rollingstone.com/music/music-news/taylor-swift-makes-history-2023-vmas-1234823495/) from the original on September 13, 2023.
- Reference 210: [Archived](https://web.archive.org/web/20230206000806/https://www.theguardian.com/music/2023/feb/05/grammy-awards-2022-list-of-winners) from the original on February 6, 2023.
- Reference 211: [Archived](https://web.archive.org/web/20240205024530/https://www.usatoday.com/story/entertainment/music/2024/02/04/taylor-swift-wins-grammys-2024-midnights/72425158007/) from the original on February 5, 2024.
- Reference 212: [Archived](https://archive.today/20230719003927/https://www.billboard.com/music/chart-beat/taylor-swift-speak-now-taylors-version-number-one-debut-billboard-200-chart-1235372565/) from the original on July 19, 2023.
- Reference 213: [Archived](https://web.archive.org/web/20231105200203/https://www.billboard.com/music/chart-beat/taylor-swift-1989-taylors-version-number-one-billboard-200-albums-chart-1235463917/)
- Reference 214: [Archived](https://web.archive.org/web/20231106184532/https://www.billboard.com/music/chart-beat/taylor-swift-is-it-over-now-number-1-hot-100-debut-1235464462/)
- Reference 215: [Archived](https://web.archive.org/web/20220523160429/https://variety.com/2021/music/news/aaron-dessner-justin-vernon-big-red-machine-taylor-swift-album-1235007462/)
- Reference 216: [Archived](https://web.archive.org/web/20210219000151/https://pitchfork.com/news/haim-enlist-taylor-swift-for-new-gasoline-remix-listen/)
- Reference 217: [Archived](https://web.archive.org/web/20220211002033/https://www.billboard.com/music/pop/ed-sheeran-taylor-swift-joker-and-the-queen-remix-video-1235029898/)
- Reference 218: [Archived](https://web.archive.org/web/20230118184740/https://www.billboard.com/music/rock/the-national-first-two-pages-of-frankenstein-tracklist-taylor-swift-phoebe-bridgers-sufjan-stevens-1235200793/)
- Reference 219: [Archived](https://web.archive.org/web/20221224085242/https://variety.com/2022/awards/musicians/taylor-swift-all-too-well-oscars-snub-1235467496/)
```
