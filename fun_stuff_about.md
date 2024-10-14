---
layout: page
title: 'About Me: Fun Stuff'
nav-menu: true
image: null
---
<p style="text-align: center;">
  Here's a little something different—some fun facts and quirky details about me!
</p>

<style>
  .section-divider {
      border-bottom: 2px solid white;
      margin: 1.5em 0;
      display: inline-block;
      width: 100%;
  }

  .two-column {
      display: flex;
      justify-content: space-between;
      gap: 1rem; /* Space between the columns */
  }

  .column {
      flex: 1; /* Equal width for both columns */
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.1); /* Light transparent background */
      border-radius: 8px;
  }

  .vertical-line {
      border-left: 2px solid rgba(255, 255, 255, 0.5); /* Light, transparent vertical line */
      height: 100%;
      margin: 0 1rem;
  }

  /* Style for the header image transparency */
  .banner {
      position: relative;
      background: url('assets/images/singing.JPG') no-repeat center center; /* Directly reference the image here */
      background-size: cover;
      height: 300px;
      opacity: 0.4; /* Set the transparency level */
  }

  .banner .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 3rem;
      text-align: center;
  }
</style>

<!-- Transparent Banner Section -->
<div class="banner">
  <div class="title">{{ page.title }}</div>
</div>

<div class="two-column">
  <div class="column">
    <h2>Hobbies</h2>
    <div class="section-divider"></div>
    <ul>
      <li><strong>Gaming:</strong> I'm into strategy/builder games like Cities Skylines, puzzle games, and classics like Team Fortress 2.</li>
      <li><strong>Music:</strong> I play guitar, do clean and harsh vocals, and compose baroque and metal music. In August 2024, I released a metal album under the artist name "Mystechron". I go to plenty of metal shows and am active in the CStat music scene.</li>
      <li><strong>Books:</strong> I like old horror like H.P. Lovecraft and modern non-fiction about any topic under the sun.</li>
    </ul>

    <h2>Favorite Things</h2>
    <div class="section-divider"></div>
    <ul>
      <li><strong>TV Show:</strong> Smiling Friends, it's a breath of fresh air in modern animation.</li>
      <li><strong>Movie:</strong> I'm a sucker for Studio Ghibli, my favorite is Princess Mononoke.</li>
      <li><strong>Band:</strong> A tie between Dream Theater and Behemoth! I'm a huge metal fan and could honestly make a case for dozens of bands being my favorite!</li>
      <li><strong>Animal:</strong> I love cats with all of my heart. They're the best. I'm also quite fond of small, brown, and furry critters like wombats and marmots.</li>
    </ul>

  </div>

  <div class="vertical-line"></div>

  <div class="column">
    <h2>Quirky Facts</h2>
    <div class="section-divider"></div>
    <ul>
      <li><strong>Fact #1:</strong> I'm really good at voice impressions.</li>
      <li><strong>Fact #2:</strong> I once knew how to play 5 instruments. (I will say that being ok at 5 instruments is much easier than being good at 1 instrument ;) )</li>
      <li><strong>Fact #3:</strong> I don't get chances to go hiking often, but I like going on week-long backpacking journeys in the summer.</li>
    </ul>

    <h2>Current Obsessions</h2>
    <div class="section-divider"></div>
    <ul>
      <li><strong>Music:</strong> Bluegrass Black Metal. Sounds strange, I know, but give it a try! My suggestion is the band "Panopticon".</li>
      <li><strong>Show:</strong> While not technically a show... I've been watching a lot of video essays on how technology (iPads) is affecting early childhood development.</li>
      <li><strong>Game:</strong> The classic! Team Fortress 2... it never gets old.</li>
    </ul>
  </div>
</div>
