const highlightHTMLContent = require('./index.js');

test('Basic Test 1', () => {
  const htmlContent = '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
  const plainText = 'Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------';
  const plainTextPositions = [
    {
      start: 241,
      end: 247,
    },
    {
      start: 518,
      end: 525,
    },
  ];
  const result = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(result).toEqual('<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | <mark>Privacy</mark> Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>');
});

test('Basic Test 2', () => {
  const htmlContent = '<p><span>This is a test paragraph.</span></p>';
  const plainText = 'This is a test paragraph.';
  const plainTextPositions = [
    {
      start: 0,
      end: 4,
    },
    {
      start: 10,
      end: 14,
    },
  ];
  const result = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(result).toEqual('<p><span><mark>This</mark> is a <mark>test</mark> paragraph.</span></p>');
});

test('Basic Test 3', () => {
  const htmlContent = '<div><h1>Welcome to my website!</h1><p>This is a sample paragraph.</p></div>';
  const plainText = 'Welcome to my website! This is a sample paragraph.';
  const plainTextPositions = [
    {
      start: 0,
      end: 7,
    },
    {
      start: 23,
      end: 28,
    },
  ];
  const result = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(result).toEqual('<div><h1><mark>Welcome</mark> to my website!</h1><p><mark>This </mark>is a sample paragraph.</p></div>');
});

test('Edge Case Test 1', () => {
  const htmlContent = '<p><span>This is a test paragraph.</span></p>';
  const plainText = 'This is a test paragraph.';
  const plainTextPositions = [];
  const result = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(result).toEqual('<p><span>This is a test paragraph.</span></p>');
});

test('Edge Case Test 2', () => {
  const htmlContent = '<div><h1>We<p>come</p> to my website!</h1><p>This is a sample paragraph.</p></div>';
  const plainText = 'We come to my website! This is a sample paragraph.';
  const plainTextPositions = [
    {
      start: 0,
      end: 7,
    },
    {
      start: 23,
      end: 28,
    },
  ];
  const result = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(result).toEqual('<div><h1><mark>We<p>come</p></mark> to my website!</h1><p><mark>This </mark>is a sample paragraph.</p></div>');
});
