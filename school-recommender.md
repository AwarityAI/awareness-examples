# School Recommender
This example project shows how you can use Awareness as a recommendation system. The scenario we're going to explore is a middleclass family that has a daughter that's about to enter highschool and they're trying to decide which school in their area would be the best fit for her. They live in Bellevue, WA which has a mix of public & private schools to choose from. Their daughter loves math and potentially wants to be a mathematician so let's see how Awareness can help select the perfect school for her.

## Project Dataset
The dataset for this project is a selection of 18 schools in the Bellevue, WA area. We're going to have Awareness aggregate the profiles of each school on [GreatSchools](https://www.greatschools.org/), [NICHE](https://www.niche.com/), and [SchoolDigger](https://www.schooldigger.com/). There are 54 links which result in a corpus of around 500k tokens in length so well beyond the 128k token context window size of the GPT-4o model we're going to use for our examples.  Here are the individual links:

```
https://www.greatschools.org/washington/mercer-island/1028-Mercer-Island-High-School/
https://www.niche.com/k12/mercer-island-high-school-mercer-island-wa/
https://www.schooldigger.com/go/WA/schools/0498000761/school.aspx
https://www.greatschools.org/washington/bellevue/129-Newport-Senior-High-School/
https://www.niche.com/k12/newport-high-school-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/0039000078/school.aspx
https://www.greatschools.org/washington/kirkland/924-International-Community-School/
https://www.niche.com/k12/international-community-school-kirkland-wa/
https://www.schooldigger.com/go/WA/schools/0423002568/school.aspx
https://www.greatschools.org/washington/bellevue/117-Bellevue-High-School/
https://www.niche.com/k12/bellevue-high-school-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/0039000060/school.aspx
https://www.greatschools.org/washington/bellevue/3462-International-School/
https://www.niche.com/k12/international-school-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/0039003149/school.aspx
https://www.greatschools.org/washington/bellevue/125-Interlake-Senior-High-School/
https://www.niche.com/k12/interlake-high-school-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/0039000072/school.aspx
https://www.greatschools.org/washington/bellevue/134-Sammamish-Senior-High-School/
https://www.niche.com/k12/sammamish-high-school-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/0039000085/school.aspx
https://www.greatschools.org/washington/bellevue/5753-Bellevue-Big-Picture-School/
https://www.niche.com/k12/bellevue-big-picture-school-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/0039003354/school.aspx
https://www.greatschools.org/washington/kirkland/3251-Family-Learning-Center/
https://www.niche.com/k12/emerson-high-school-kirkland-wa/
https://www.schooldigger.com/go/WA/schools/0423001784/school.aspx
https://www.greatschools.org/washington/bellevue/2294-Forest-Ridge-School-Of-The-Sacred-Heart/
https://www.niche.com/k12/forest-ridge-school-of-the-sacred-heart-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/9999924152/school.aspx
https://www.greatschools.org/washington/bellevue/2336-Bellevue-Christian-School/
https://www.niche.com/k12/bellevue-christian-school-clyde-hill-campus-clyde-hill-wa/
https://www.schooldigger.com/go/WA/schools/9999924011/school.aspx
https://www.greatschools.org/washington/mercer-island/2477-Northwest-Yeshiva-High-School/
https://www.niche.com/k12/northwest-yeshiva-high-school-mercer-island-wa/
https://www.schooldigger.com/go/WA/schools/9999924331/school.aspx
https://www.greatschools.org/washington/mercer-island/2648-Yellow-Wood-Academy/
https://www.niche.com/k12/yellow-wood-academy-mercer-island-wa/
https://www.schooldigger.com/go/WA/schools/9999975941/school.aspx
https://www.greatschools.org/washington/bellevue/2698-Hillside-Student-Community/
https://www.niche.com/k12/hillside-student-community-school-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/9999924188/school.aspx
https://www.greatschools.org/washington/bellevue/3369-Dartmoor-School/
https://www.niche.com/k12/dartmoor-school---bellevue-bellevue-wa/
https://www.schooldigger.com/go/WA/schools/9999979106/school.aspx
https://www.greatschools.org/washington/kirkland/3438-Eastside-Preparatory-School/
https://www.niche.com/k12/eastside-preparatory-school-kirkland-wa/
https://www.schooldigger.com/go/WA/schools/9999954960/school.aspx
https://www.greatschools.org/washington/mercer-island/3805-The-Privett-Academy/
https://www.niche.com/k12/the-privett-academy-mercer-island-wa/
https://www.schooldigger.com/go/WA/schools/9999975764/school.aspx
https://www.greatschools.org/washington/fall-city/5828-Summit-Classical-Christian-School/
https://www.niche.com/k12/summit-classical-christian-school-issaquah-wa/
https://www.schooldigger.com/go/WA/schools/9999955021/school.aspx
```

## Example Questions & Answers
To evaluate the projects dataset we're going to use GPT-4o. The example Q&A pairs below are as of early July 2024 and cost around $2.50 per query.

Lets start by asking for list of recommended schools:

**we're a middle class family in bellevue, wa. our daughter is starting highschool next year. she loves math and wants to pursue a math degree. what schools should we consider and why?**
```
Given your daughter's passion for math and your middle-class status, here are some high schools in Bellevue, WA, that you should consider:

1. **International School**:
   - **Why**: It ranks 2nd out of 442 public high schools in Washington and has an average standard score of 99.2 in 2023. The school has a strong academic performance, particularly in math, with 83% proficiency in SBAC/Math. It offers advanced courses and has a College Readiness rating of 10/10, making it an excellent choice for a student interested in pursuing a math degree.

2. **Interlake Senior High School**:
   - **Why**: It ranks 19th out of 442 public high schools in Washington with an average standard score of 94.1 in 2023. The school offers both AP and IB programs, which are beneficial for college preparation. It has a high average SAT score of 1410 and an average ACT score of 32, indicating strong academic performance. The school also has a high graduation rate of 92%.

3. **Bellevue High School**:
   - **Why**: It ranks 10th out of 442 public high schools in Washington with an average standard score of 95.9 in 2023. The school has a strong academic reputation and offers AP programs. It has a high average SAT score of 1350 and an average ACT score of 30. The school also has a high graduation rate of 92%.

4. **Newport Senior High School**:
   - **Why**: It ranks 31st out of 442 public high schools in Washington with an average standard score of 91.3 in 2023. The school has a strong math program with a 75% proficiency rate in math. It offers AP courses and has a high average SAT score of 1380 and an average ACT score of 31. The school has a high graduation rate of 96%.

5. **Mercer Island High School** (near Bellevue):
   - **Why**: It ranks 5th out of 442 public high schools in Washington with an average standard score of 98.2 in 2023. The school has a strong academic performance, particularly in math, with 82% proficiency. It offers AP courses and has an average SAT score of 1380 and an average ACT score of 31. The school has a high graduation rate of 93%.

These schools offer strong math programs, advanced coursework, and high academic performance, making them suitable for your daughter's aspirations in pursuing a math degree.
```


