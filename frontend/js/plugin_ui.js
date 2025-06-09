var colors = {
    "-1":"#58bc8a", // safe
    "0":"#ffeb3c", // warning
    "1":"#ff8b66"  // risky
};

function getBadgeClass(val) {
    if (val == "-1") return "safe";
    if (val == "0") return "warning";
    return "risky";
}

function setScoreCircleColor(percent) {
    var circle = document.getElementById('scoreCircle');
    circle.classList.remove('score-safe', 'score-warning', 'score-risky');
    if (percent >= 80) {
        circle.classList.add('score-safe');
    } else if (percent >= 50) {
        circle.classList.add('score-warning');
    } else {
        circle.classList.add('score-risky');
    }
}

function animateScore(target) {
    var duration = 1200; // ms
    var start = 0;
    var startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var current = Math.floor(progress * target);
        $("#site_score").text(current + "%");
        setScoreCircleColor(current);
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            $("#site_score").text(target + "%");
            setScoreCircleColor(target);
        }
    }
    requestAnimationFrame(step);
}

function updateStatusMessage(legitimatePercent, isPhish) {
    var msg = '';
    if (isNaN(legitimatePercent)) {
        msg = 'Idk about this one mate @@';
    } else if (isPhish) {
        msg = 'Yo this site is not legit bro>.<';
    } else {
        msg = 'This site is pretty safe ngl :v';
    }
    document.querySelector('.site-message span:not(.score-circle):not(#scoreCircle)').textContent = msg;
}

chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){
    chrome.storage.local.get(['results', 'legitimatePercents', 'isPhish'], function(items) {
        var result = items.results[tabs[0].id];
        var isPhish = items.isPhish[tabs[0].id];
        var legitimatePercent = parseInt(items.legitimatePercents[tabs[0].id]);

        // Render factor badges
        var badgesDiv = document.getElementById('factorsBadges');
        badgesDiv.innerHTML = '';
        for (var key in result) {
            var badge = document.createElement('span');
            badge.className = 'badge-feature ' + getBadgeClass(result[key]);
            badge.textContent = key;
            badgesDiv.appendChild(badge);
        }

        animateScore(legitimatePercent);
        updateStatusMessage(legitimatePercent, isPhish);
    });
});

