export const makeSubManager = () => {
  let currentSub = null;

  const api = {
    sub(subscription) {
      api.unsub();
      currentSub = subscription;
    },
    unsub() {
      if (currentSub !== null) {
        currentSub.unsubscribe();
        currentSub = null;
      }
    },
  };

  return api;
};

/**
 * 欧拉角顺规xyz
 * output Euler angles, pitch-yaw-roll
 * @param  {quat} mat Quaternion
 * @return {vec3} xyz
 */
export function toEulerXYZ(quat: quat) {
  const w = quat[3];
  const x = quat[0];
  const y = quat[1];
  const z = quat[2];

  const wx = w * x,
    wy = w * y,
    wz = w * z;
  const xx = x * x,
    xy = x * y,
    xz = x * z;
  const yy = y * y,
    yz = y * z,
    zz = z * z;

  const xyz = [
    -Math.atan2(2 * (yz - wx), 1 - 2 * (xx + yy)),
    Math.asin(2 * (xz + wy)),
    -Math.atan2(2 * (xy - wz), 1 - 2 * (yy + zz)),
  ];
  return xyz.map((x) => (x * 180) / Math.PI);
}