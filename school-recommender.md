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

---
**QUESTION:** we're a middle class family in bellevue, wa. our daughter is starting highschool next year. she loves math and wants to pursue a math degree. what schools should we consider and why? \
**ANSWER:** \
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

---
That seems like a reasonable answer but is it really evaluating all of the schools?  Lets add on to our query and ask it to list the other schools it didn't recommend and why:

---
**QUESTION:** we're a middle class family in bellevue, wa. our daughter is starting highschool next year. she loves math and wants to pursue a math degree. what schools should we consider and why? include a list of the other schools and why you wouldn't recommend them \
**ANSWER:** \
For a middle-class family in Bellevue, WA, with a daughter who loves math and wants to pursue a math degree, here are the recommended schools to consider:

### Recommended Schools:

1. **International School**:
   - **Why**: International School ranks 2nd out of 442 Washington high schools and has an extremely high math proficiency rate of 83%. It offers a rigorous academic environment with a strong focus on college readiness, making it an excellent choice for a student interested in pursuing a math degree.

2. **Interlake Senior High School**:
   - **Why**: Interlake Senior High School ranks 19th out of 442 Washington high schools and has a strong math proficiency rate of 73.4%. The school offers a diverse learning environment and a variety of advanced placement courses, which can provide a solid foundation for a future in math.

3. **Bellevue High School**:
   - **Why**: Bellevue High School ranks 10th out of 442 Washington high schools and has a math proficiency rate of 67.7%. It consistently ranks among the top high schools in the state and offers a variety of extracurricular activities, including advanced courses that can benefit a student aiming for a math degree.

4. **Newport Senior High School**:
   - **Why**: Newport Senior High School ranks 31st out of 442 Washington high schools and has a math proficiency rate of 78.2%. It has a strong academic performance and offers a variety of advanced courses, making it a good option for a student interested in math.

### Other Schools and Why Not Recommended:

1. **Sammamish Senior High**:
   - **Why Not**: Although it ranks 107th out of 442 Washington high schools, its math proficiency rate is lower at 39.9%, which may not provide the same level of academic rigor in math as the recommended schools.

2. **Bellevue Big Picture School**:
   - **Why Not**: This school ranks 125th out of 442 Washington high schools and has a math proficiency rate of 45.7%. While it offers a unique project-based learning environment, it may not be as strong in traditional academic subjects like math compared to the recommended schools.

3. **Emerson High School**:
   - **Why Not**: Emerson High School ranks 182nd out of 442 Washington high schools and has a very small student body with lower academic performance. It may not offer the advanced math courses your daughter is interested in.

4. **Career Education Options Reengagement Program**:
   - **Why Not**: This program is designed for students who have dropped out of high school and are looking to reengage with their education. It may not offer the advanced mathematics courses your daughter is interested in.

5. **Mercer Island High School**:
   - **Why Not**: Although it ranks 5th out of 442 Washington high schools and has a strong academic performance, it is located in Mercer Island, which might be less convenient for a family living in Bellevue.

6. **International Community School (Kirkland, WA)**:
   - **Why Not**: This school has a high math proficiency rate and strong academic performance, but it is located in Kirkland, which might be less convenient for a family living in Bellevue.

7. **Northwest Yeshiva High School**:
   - **Why Not**: This private school has a strong academic reputation but is located in Mercer Island and has a high tuition cost, which might be a consideration for a middle-class family.

8. **Eastside Preparatory School**:
   - **Why Not**: This private school in Kirkland, WA, has a strong academic focus but also has a high tuition cost, which might be a consideration for a middle-class family.

9. **Forest Ridge School Of The Sacred Heart**:
   - **Why Not**: This private, all-girls school in Bellevue, WA, has a strong academic reputation but there is no specific information about its math program or college readiness in the provided details.

10. **Hillside Student Community School**:
    - **Why Not**: This private school has a very low student/teacher ratio, which allows for significant individual attention, but there is no specific information about its math program or college readiness in the provided details.

11. **Summit Classical Christian School**:
    - **Why Not**: This private school has a high percentage of White students and offers a classical Christian education, which may not align with a focus on advanced math.

12. **Open Window School**:
    - **Why Not**: This private school only goes up to 8th grade, so it would not be suitable for your daughter who is starting high school.

13. **Yellow Wood Academy**:
    - **Why Not**: This private school has a very small student body, which might limit social and extracurricular opportunities.

14. **Privett Academy**:
    - **Why Not**: This private school has a very small student body and there is no data available on its average graduation rate, SAT scores, or ACT scores, which might be important for a family considering a school for a student interested in pursuing a math degree.

15. **Dartmoor School**:
    - **Why Not**: This private school has a very low student/teacher ratio but also has a very small student body, which might limit social and extracurricular opportunities.

16. **Pacific Learning Academy**:
    - **Why Not**: This private school has a small student body, which might limit social and extracurricular opportunities.

By considering these factors, you can choose a school that best fits your daughter's academic interests and your family's needs.

---
In this run we see that while it's explination text for each school is a little different, it recommended 4 of the 5 schools in its original response. The one school it shifted to the "other" list, Mercer Island High School, was originally listed as being outside of Bellevue so all in all I'd say the recommendations are consistent across queries and it's clear that all schools are in fact being reasoned over.

What's interesting is that it mentions 20 schools total and we only feed it profiles for 18 schools. The `Career Education Options Reengagement Program` and `Open Window School` were not profiles in the dataset so where are those coming from? After digging into the data ingested by Awareness it becomes clear that these schools show up a lot as "related" schools on the various pages. What isn't in the data are things like `The Career Education Options Reengagement Program is designed for students who have dropped out of high school and are looking to reengage with their education.` The model is pulling that from its world knowledge and while you could view that as a hallucination, its a useful one in this case.

There's actually a bunch of other schools referenced in the projects dataset and we can easily ask Awareness to return a full list with source links:

---
**QUESTION:** list the schools in the dataset and include links to the pages that mention each school \
**ANSWER:** \
Here is a list of schools along with links to the pages that mention each school:

1. **Bellevue Big Picture School**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0039003354/school.aspx)
   - [Niche](https://www.niche.com/k12/bellevue-big-picture-school-bellevue-wa/)
   - [GreatSchools](https://www.greatschools.org/washington/bellevue/5753-Bellevue-Big-Picture-School/)

2. **Sammamish Senior High**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0039000085/school.aspx)
   - [GreatSchools](https://www.greatschools.org/washington/bellevue/134-Sammamish-Senior-High-School/)
   - [Niche](https://www.niche.com/k12/sammamish-high-school-bellevue-wa/)

3. **International School**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0039003149/school.aspx)
   - [Niche](https://www.niche.com/k12/international-school-bellevue-wa/)
   - [GreatSchools](https://www.greatschools.org/washington/bellevue/3462-International-School/)

4. **Career Education Options Reengagement Program**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0039003462/school.aspx)

5. **Newport Senior High School**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0039000078/school.aspx)
   - [Niche](https://www.niche.com/k12/newport-high-school-bellevue-wa/)
   - [GreatSchools](https://www.greatschools.org/washington/bellevue/129-Newport-Senior-High-School/)

6. **Interlake Senior High School**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0039000072/school.aspx)
   - [GreatSchools](https://www.greatschools.org/washington/bellevue/125-Interlake-Senior-High-School/)
   - [Niche](https://www.niche.com/k12/interlake-high-school-bellevue-wa/)

7. **Bellevue High School**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0039000060/school.aspx)
   - [Niche](https://www.niche.com/k12/bellevue-high-school-bellevue-wa/)
   - [GreatSchools](https://www.greatschools.org/washington/bellevue/117-Bellevue-High-School/)

8. **Mercer Island High School**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0498000761/school.aspx)
   - [Niche](https://www.niche.com/k12/mercer-island-high-school-mercer-island-wa/)
   - [GreatSchools](https://www.greatschools.org/washington/mercer-island/1028-Mercer-Island-High-School/)

9. **Emerson High School**
   - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0423001784/school.aspx)
   - [Niche](https://www.niche.com/k12/emerson-high-school-kirkland-wa/)

10. **Skyline High School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0375002567/school.aspx)
    - [Niche](https://www.niche.com/k12/skyline-high-school-sammamish-wa/)

11. **Emerson K-12**
    - [GreatSchools](https://www.greatschools.org/washington/kirkland/3251-Family-Learning-Center/)

12. **Bellevue Christian School - Clyde Hill Campus**
    - [Niche](https://www.niche.com/k12/bellevue-christian-school-clyde-hill-campus-clyde-hill-wa/)
    - [GreatSchools](https://www.greatschools.org/washington/bellevue/2336-Bellevue-Christian-School/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999924011/school.aspx)

13. **International Community School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0423002568/school.aspx)
    - [Niche](https://www.niche.com/k12/international-community-school-kirkland-wa/)
    - [GreatSchools](https://www.greatschools.org/washington/kirkland/924-International-Community-School/)

14. **Yellow Wood Academy**
    - [Niche](https://www.niche.com/k12/yellow-wood-academy-mercer-island-wa/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999975941/school.aspx)
    - [GreatSchools](https://www.greatschools.org/washington/mercer-island/2648-Yellow-Wood-Academy/)

15. **Lake Washington High School**
    - [Niche](https://www.niche.com/k12/lake-washington-high-school-kirkland-wa/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0423000674/school.aspx)

16. **Eastlake High School**
    - [Niche](https://www.niche.com/k12/eastlake-high-school-sammamish-wa/)

17. **Northwest Yeshiva High School**
    - [Niche](https://www.niche.com/k12/northwest-yeshiva-high-school-mercer-island-wa/)
    - [GreatSchools](https://www.greatschools.org/washington/mercer-island/2477-Northwest-Yeshiva-High-School/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999924331/school.aspx)

18. **Washington Network for Innovative Careers Skill Center**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0423003289/school.aspx)

19. **Sammamish River Valley Online School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0423003799/school.aspx)

20. **Lake Washington Technical Academy**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0031303265/school.aspx)

21. **Open Doors at LWIT**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0031303403/school.aspx)

22. **Islander Middle School**
    - [Niche](https://www.niche.com/k12/islander-middle-school-mercer-island-wa/)

23. **Issaquah High School**
    - [Niche](https://www.niche.com/k12/issaquah-high-school-issaquah-wa/)

24. **Hillside Student Community School**
    - [Niche](https://www.niche.com/k12/hillside-student-community-school-bellevue-wa/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999924188/school.aspx)
    - [GreatSchools](https://www.greatschools.org/washington/bellevue/2698-Hillside-Student-Community/)

25. **Summit Classical Christian School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999955021/school.aspx)
    - [Niche](https://www.niche.com/k12/summit-classical-christian-school-issaquah-wa/)
    - [GreatSchools](https://www.greatschools.org/washington/fall-city/5828-Summit-Classical-Christian-School/)

26. **The Privett Academy**
    - [GreatSchools](https://www.greatschools.org/washington/mercer-island/3805-The-Privett-Academy/)
    - [Niche](https://www.niche.com/k12/the-privett-academy-mercer-island-wa/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999975764/school.aspx)

27. **Forest Ridge School of the Sacred Heart**
    - [Niche](https://www.niche.com/k12/forest-ridge-school-of-the-sacred-heart-bellevue-wa/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999924152/school.aspx)
    - [GreatSchools](https://www.greatschools.org/washington/bellevue/2294-Forest-Ridge-School-Of-The-Sacred-Heart/)

28. **Eastside Preparatory School**
    - [GreatSchools](https://www.greatschools.org/washington/kirkland/3438-Eastside-Preparatory-School/)
    - [Niche](https://www.niche.com/k12/eastside-preparatory-school-kirkland-wa/)
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999954960/school.aspx)

29. **Dartmoor School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/9999979106/school.aspx)
    - [GreatSchools](https://www.greatschools.org/washington/bellevue/3369-Dartmoor-School/)
    - [Niche](https://www.niche.com/k12/dartmoor-school---bellevue-bellevue-wa/)

30. **Rainier Valley Leadership Academy**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0034203602/school.aspx)

31. **Rainier Beach High School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0771001236/school.aspx)

32. **Interagency Open Doors**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0771003505/school.aspx)

33. **Franklin High School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0771001168/school.aspx)

34. **Griffin Home**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0723002343/school.aspx)

35. **Hazen Senior High School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0723001080/school.aspx)

36. **Futures School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0423002727/school.aspx)

37. **Juanita High School**
    - [SchoolDigger](https://www.schooldigger.com/go/WA/schools/0423000670/school.aspx)

38. **Secondary Academy for Success**
    - [Niche](https://www.niche.com/k12/secondary-academy-for-success-bothell-wa/)

39. **Chinook Middle School**
    - [Niche](https://www.niche.com/k12/chinook-middle-school-bellevue-wa/)

40. **Odle Middle School**
    - [Niche](https://www.niche.com/k12/odle-middle-school-bellevue-wa/)

---
You can get more consistency from the models output by telling Awareness the fields you'd like to see in the output. For a recommendion question this can result in slightly different recommendations because you're basically telling the model what fields to weigh on at the same time. Just keep that in mind: 

---
**QUESTION:** we're a middle class family in bellevue, wa. our daughter is starting highschool next year. she loves math and wants to pursue a math degree. what schools should we consider and why? for each school return name, description, website, raitings, and explination \
**ANSWER:** \
Here are some schools in Bellevue, WA, that you should consider for your daughter who loves math and wants to pursue a math degree:

1. **Bellevue High School**
   - **Description**: Bellevue High School is a public high school serving grades 9-12 in the Bellevue School District. It consistently ranks among the top high schools in the state, delivering exceptional academic performance and supporting the success of all its students.
   - **Website**: [Bellevue High School](https://www.schooldigger.com/go/WA/schools/0039000060/school.aspx)
   - **Ratings**:
     - SchoolDigger: 10th out of 442 Washington high schools
     - Niche: 3.94 out of 5 (218 reviews)
     - Overall Niche Grade: A+
   - **Explanation**: Bellevue High School's strong academic performance, particularly in math, makes it an excellent choice for your daughter. The school's high test scores and graduation rates indicate a supportive and effective learning environment.

2. **International School**
   - **Description**: International School is a public school serving grades 6-12, located at 445 128th Ave SE, Bellevue, WA 98005. It is part of the Bellevue School District and has a smaller student body of 593 students.
   - **Website**: [International School](https://www.schooldigger.com/go/WA/schools/0039003149/school.aspx)
   - **Ratings**:
     - SchoolDigger: 2nd out of 442 Washington high schools
     - Niche: 3.96 out of 5 (96 reviews)
     - Overall Niche Grade: A+
   - **Explanation**: International School offers a rigorous academic program and serves grades 6-12, providing a continuous and stable learning environment. Its high rating suggests a strong academic focus, which would be beneficial for her interest in math.

3. **Newport Senior High School**
   - **Description**: Newport Senior High School is a public school serving grades 9-12, located at 4333 Factoria Boulevard SE, Bellevue, WA 98006. It has a diverse student body and offers a variety of advanced placement (AP) courses.
   - **Website**: [Newport Senior High School](https://www.schooldigger.com/go/WA/schools/0039000078/school.aspx)
   - **Ratings**:
     - SchoolDigger: 31st out of 442 Washington high schools
     - Niche: 3.82 out of 5 (369 reviews)
     - GreatSchools: 10/10
   - **Explanation**: Newport Senior High School is highly rated for its academic excellence, particularly in math. The school also has a high average SAT score of 1380, indicating strong college preparation.

4. **Interlake Senior High School**
   - **Description**: Interlake Senior High School is a public school serving grades 9-12, located at 16245 NE 24th Street, Bellevue, WA 98008. It offers both AP and IB programs.
   - **Website**: [Interlake Senior High School](https://www.schooldigger.com/go/WA/schools/0039000072/school.aspx)
   - **Ratings**:
     - SchoolDigger: 19th out of 442 Washington high schools
     - Niche: 3.82 out of 5 (424 reviews)
     - Overall Niche Grade: A+
   - **Explanation**: Interlake Senior High School offers a strong academic program, which could be beneficial for a student interested in pursuing a math degree. The school has a high average SAT score of 1410 and a graduation rate of 92%, indicating strong academic performance and college readiness.

5. **Bellevue Big Picture School**
   - **Description**: Bellevue Big Picture School is a public school for grades 6-12 located at 14844 SE 22nd Street, Bellevue, WA 98007. It focuses on personalized learning and project-based education.
   - **Website**: [Bellevue Big Picture School](https://www.schooldigger.com/go/WA/schools/0039003354/school.aspx)
   - **Ratings**:
     - SchoolDigger: 125th out of 442 Washington high schools
     - SchoolDigger Rating: 4 stars out of 5
   - **Explanation**: The personalized learning approach at Bellevue Big Picture School could provide a tailored educational experience for a student passionate about math. The smaller student body and lower student/teacher ratio could offer a more personalized learning experience.

6. **Sammamish High School**
   - **Description**: Sammamish High School is a public school located in Bellevue, WA. It has 1,275 students in grades 9-12 and offers AP programs.
   - **Website**: [Sammamish High School](https://www.niche.com/k12/sammamish-high-school-bellevue-wa/)
   - **Ratings**:
     - Niche: 3.86 out of 5 (253 reviews)
     - Overall Niche Grade: A
   - **Explanation**: Sammamish High School provides a supportive environment and a variety of extracurricular activities, which can be beneficial for your daughter's overall development. The school has a strong academic program and offers AP courses, making it a good option for a student interested in math.

These schools offer strong academic programs and supportive environments that can help your daughter excel in math and prepare for a future math degree.

---
Our recommendations shifted just a bit but with this query you can really see the data blending that Awareness is facilitating...
