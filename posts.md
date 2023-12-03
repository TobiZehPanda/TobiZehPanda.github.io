---
layout: page
title: Posts
---
<style>
  h3 { color: #339af0; }
</style>

# Posts
{% for post in site.posts %} 
  <h2>
    <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">{{ post.date | date: "%B %e, %Y" }}</time>
  </h2>
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
{% endfor %}

