
  window.addEventListener('load', () => {
    const canvas = document.getElementById('connectionCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('imageLayout');
    const items = container.querySelectorAll('.item');
    const center = container.querySelector('.center');

    function resizeCanvas() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      drawLines();
    }

    function drawLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerRect = center.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const centerX = centerRect.left + centerRect.width / 2 - containerRect.left;
      const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;

      items.forEach(item => {
        if (item === center) return;

        const rect = item.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - containerRect.left;
        const y = rect.top + rect.height / 2 - containerRect.top;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#5c5246';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  });

