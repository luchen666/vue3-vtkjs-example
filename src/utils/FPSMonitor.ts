export interface FPSMonitorOptions {
  updateInterval?: number;
  showElement?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
}

export class FPSMonitor {
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private fps: number = 0;
  private frameTime: number = 0;
  private frameTimes: number[] = [];
  private maxFrameTimeSamples: number = 60;
  private updateInterval: number;
  private lastUpdateTime: number = performance.now();
  private showElement: boolean;
  private element: HTMLElement | null = null;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;

  constructor(options: FPSMonitorOptions = {}) {
    this.updateInterval = options.updateInterval || 500;
    this.showElement = options.showElement !== false;
    
    if (this.showElement) {
      this.createUI(options);
    }
  }

  private createUI(options: FPSMonitorOptions) {
    this.element = document.createElement('div');
    this.element.style.position = 'fixed';
    this.element.style.zIndex = '9999';
    this.element.style.backgroundColor = options.backgroundColor || 'rgba(0, 0, 0, 0.7)';
    this.element.style.color = options.textColor || '#00ff00';
    this.element.style.fontSize = options.fontSize || '14px';
    this.element.style.padding = options.padding || '10px';
    this.element.style.borderRadius = options.borderRadius || '5px';
    this.element.style.fontFamily = 'monospace';
    this.element.style.pointerEvents = 'none';
    this.element.style.userSelect = 'none';
    
    const position = options.position || 'top-left';
    const positions: Record<string, { top?: string; bottom?: string; left?: string; right?: string }> = {
      'top-left': { top: '10px', left: '10px' },
      'top-right': { top: '10px', right: '10px' },
      'bottom-left': { bottom: '10px', left: '10px' },
      'bottom-right': { bottom: '10px', right: '10px' }
    };
    
    const pos = positions[position];
    if (pos.top) this.element.style.top = pos.top;
    if (pos.bottom) this.element.style.bottom = pos.bottom;
    if (pos.left) this.element.style.left = pos.left;
    if (pos.right) this.element.style.right = pos.right;
    
    this.updateDisplay();
    document.body.appendChild(this.element);
  }

  private updateDisplay() {
    if (!this.element) return;
    
    const avgFrameTime = this.frameTimes.length > 0 
      ? this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length 
      : 0;
    
    const maxFrameTime = this.frameTimes.length > 0 
      ? Math.max(...this.frameTimes) 
      : 0;
    
    const minFrameTime = this.frameTimes.length > 0 
      ? Math.min(...this.frameTimes) 
      : 0;
    
    this.element.innerHTML = `
      <div>FPS: ${this.fps.toFixed(1)}</div>
      <div>帧耗时: ${avgFrameTime.toFixed(2)} ms</div>
      <div>最大帧耗时: ${maxFrameTime.toFixed(2)} ms</div>
      <div>最小帧耗时: ${minFrameTime.toFixed(2)} ms</div>
    `;
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.lastUpdateTime = performance.now();
    this.frameCount = 0;
    this.frameTimes = [];
    this.tick();
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private tick() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    this.frameCount++;
    this.frameTime = deltaTime;
    
    this.frameTimes.push(deltaTime);
    if (this.frameTimes.length > this.maxFrameTimeSamples) {
      this.frameTimes.shift();
    }
    
    const timeSinceLastUpdate = currentTime - this.lastUpdateTime;
    if (timeSinceLastUpdate >= this.updateInterval) {
      this.fps = (this.frameCount * 1000) / timeSinceLastUpdate;
      this.frameCount = 0;
      this.lastUpdateTime = currentTime;
      
      if (this.showElement) {
        this.updateDisplay();
      }
    }
    
    this.animationFrameId = requestAnimationFrame(() => this.tick());
  }

  public update() {
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    this.frameCount++;
    this.frameTime = deltaTime;
    
    this.frameTimes.push(deltaTime);
    if (this.frameTimes.length > this.maxFrameTimeSamples) {
      this.frameTimes.shift();
    }
    
    const timeSinceLastUpdate = currentTime - this.lastUpdateTime;
    if (timeSinceLastUpdate >= this.updateInterval) {
      this.fps = (this.frameCount * 1000) / timeSinceLastUpdate;
      this.frameCount = 0;
      this.lastUpdateTime = currentTime;
      
      if (this.showElement) {
        this.updateDisplay();
      }
    }
  }

  public getFPS(): number {
    return this.fps;
  }

  public getFrameTime(): number {
    return this.frameTime;
  }

  public getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
  }

  public getMaxFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return Math.max(...this.frameTimes);
  }

  public getMinFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return Math.min(...this.frameTimes);
  }

  public destroy() {
    this.stop();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
  }

  public show() {
    if (this.element) {
      this.element.style.display = 'block';
    }
  }

  public hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  public setPosition(position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') {
    if (!this.element) return;
    
    const positions: Record<string, { top?: string; bottom?: string; left?: string; right?: string }> = {
      'top-left': { top: '10px', left: '10px' },
      'top-right': { top: '10px', right: '10px' },
      'bottom-left': { bottom: '10px', left: '10px' },
      'bottom-right': { bottom: '10px', right: '10px' }
    };
    
    this.element.style.top = '';
    this.element.style.bottom = '';
    this.element.style.left = '';
    this.element.style.right = '';
    
    const pos = positions[position];
    if (pos.top) this.element.style.top = pos.top;
    if (pos.bottom) this.element.style.bottom = pos.bottom;
    if (pos.left) this.element.style.left = pos.left;
    if (pos.right) this.element.style.right = pos.right;
  }
}
