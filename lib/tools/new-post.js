const fs = require('fs')
const uniqid = require('uniqid')

const DRAFT_DIR = 'draft'

function yyyyMmDd() {
  const date = new Date()
  const y = date.getFullYear()
  const m = ('00' + (date.getMonth() + 1)).slice(-2)
  const d = ('00' + date.getDate()).slice(-2)
  return y + '-' + m + '-' + d
}

function makeNewPost() {
  if (!fs.existsSync(DRAFT_DIR)) {
    fs.mkdirSync(DRAFT_DIR)
  }
  const uniqId = uniqid.time()
  const path = `${DRAFT_DIR}/${uniqId}.mdx`
  const frontmatter = `---
title: ''
date: '${yyyyMmDd()}'
description: ''
eyeCatch: ''
tags: ['']
published: true
lastUpdated: ''  
---`
  fs.writeFileSync(path, frontmatter)
}

makeNewPost()
