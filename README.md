# Tag Cloud in TipStory Explore Page

Hi there👋 This is the Tag Cloud React component☁️ that is being used in [TipStory Explore Page](https://www.tipstory.org/explore). To learn more about how it is built, 💁‍♂️check out [my learning note on TipStory](https://www.tipstory.org/learning/3svQFkXVzgFTwyV).

![TipStory Tag Cloud Gif](https://tipstorys3bucket13315-prod.s3.amazonaws.com/protected/us-east-1%3A162fd9b5-017d-4eb8-94ff-7f301c502813/tipstory-aJuPIz1AFui6DZDOefySIBgIG.gif)

At high level, it takes an array of tags as input and attempts to place each tag into the book. Finally, it makes a tag visible every 300ms in the order of the array.

## 💻Local testing

To test this locally, type in the following in the command line

```sh
git clone https://github.com/xitanggg/tag-cloud-in-tipstory-explore-page.git
cd .\tag-cloud-in-tipstory-explore-page
npm install
npm start
```

And you should see what is appeared in [this demo](https://xitanggg.github.io/tag-cloud-in-tipstory-explore-page)🚀

---

🔍The core of creating the TipStory tag cloud is the algorithm that is used to place tags and it works in the following steps:

1. A tag is initialized with a `(x1, y1)` location at the center of the book

- `(x1, y1)` represents the location of the top left corner of a tag
- Center of the book means `y1 = bookHeight / 2`, `x1 = bookWidth / 2 + xRandomness` (`xRandomness` is a +-50px random distribution. It is used to add randomness to the tag’s Archimedean spiral path)

2. At its current `(x1, y1)` location, check if the tag is within the book and doesn’t collide with other tags.

- If a tag fails to meet any of the two conditions, the tag is moved one step along its Archimedean spiral path to obtain a new `(x1, y1)` position. The tag continues to move along the path if it still fails any of the two conditions.
- If a tag meets both conditions, it is successfully placed there.

---

🙌This implementation is largely inspired by learnings generously shared by [Jonathan Feinberg](http://static.mrfeinberg.com/bv_ch03.pdf) and [Jason Davies](https://www.jasondavies.com/wordcloud/about/). Thanks friends!
