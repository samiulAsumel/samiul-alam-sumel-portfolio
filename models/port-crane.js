// Shared model factory: gantry crane + stacked shipping containers + a delivery truck.
// Recolored to match the user's reference photo: safety-yellow RTG crane, a
// red/gray/blue/khaki container mix, and a red cab / teal trailer truck.
// Real-world meters, y-up, base resting at y=0, centered on x/z origin.
export function createPortCraneModel(THREE) {
  const root = new THREE.Group();
  root.name = 'PortCraneAndContainers';

  const mats = {
    yellow: new THREE.MeshStandardMaterial({ name: 'craneYellow', color: 0xcf9a2e, roughness: 0.55, metalness: 0.2 }),
    yellowDark: new THREE.MeshStandardMaterial({ name: 'craneYellowDark', color: 0xa87a1e, roughness: 0.6, metalness: 0.2 }),
    steel: new THREE.MeshStandardMaterial({ name: 'steelFrame', color: 0x2f2e2d, roughness: 0.6, metalness: 0.35 }),
    glass: new THREE.MeshStandardMaterial({ name: 'cabGlass', color: 0x8fa1a8, roughness: 0.25, metalness: 0.35 }),
    cable: new THREE.MeshStandardMaterial({ name: 'cable', color: 0x1c1b1a, roughness: 0.45, metalness: 0.55 }),
    containerRed: new THREE.MeshStandardMaterial({ name: 'containerRed', color: 0x8f3b30, roughness: 0.65, metalness: 0.05 }),
    containerGray: new THREE.MeshStandardMaterial({ name: 'containerGray', color: 0x8a8987, roughness: 0.65, metalness: 0.05 }),
    containerBlue: new THREE.MeshStandardMaterial({ name: 'containerBlue', color: 0x3c4d64, roughness: 0.65, metalness: 0.05 }),
    truckCab: new THREE.MeshStandardMaterial({ name: 'truckCab', color: 0x30435c, roughness: 0.5, metalness: 0.15 }),
    truckTrailer: new THREE.MeshStandardMaterial({ name: 'truckTrailer', color: 0x9c9a95, roughness: 0.55, metalness: 0.08 }),
    truckDark: new THREE.MeshStandardMaterial({ name: 'truckChassis', color: 0x201e1d, roughness: 0.6, metalness: 0.2 }),
    tire: new THREE.MeshStandardMaterial({ name: 'tire', color: 0x181716, roughness: 0.85, metalness: 0.0 }),
  };

  // ---- containers: standard 20ft box (6.06 x 2.59 x 2.44m), stacked 2x3 ----
  const containers = new THREE.Group();
  containers.name = 'containers';
  const cW = 6.06, cH = 2.59, cD = 2.44;
  const ribGeo = new THREE.BoxGeometry(cW, cH, 0.06);
  const boxGeo = new THREE.BoxGeometry(cW, cH, cD);
  const colorCycle = [mats.containerBlue, mats.containerGray, mats.containerBlue, mats.containerRed, mats.containerGray, mats.containerBlue, mats.containerGray, mats.containerRed, mats.containerBlue];
  let ci = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const mesh = new THREE.Mesh(boxGeo, colorCycle[ci % colorCycle.length]);
      mesh.name = `container_${ci + 1}`;
      mesh.position.set(col * (cW + 0.15) - (cW + 0.15), row * (cH + 0.03) + cH / 2 + 0.001, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      containers.add(mesh);
      for (let r = -1; r <= 1; r++) {
        const rib = new THREE.Mesh(ribGeo, mats.steel);
        rib.name = `container_${ci + 1}_rib_${r + 2}`;
        rib.scale.set(1, 1, 0.02);
        rib.position.set(mesh.position.x, mesh.position.y, cD / 2 + 0.002);
        rib.position.x += r * (cW / 3.2);
        containers.add(rib);
      }
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(cW, cH * 0.16, cD + 0.01), mats.steel);
      stripe.name = `container_${ci + 1}_stripe`;
      stripe.position.set(mesh.position.x, mesh.position.y + cH * 0.34, mesh.position.z);
      containers.add(stripe);
      const door = new THREE.Mesh(new THREE.BoxGeometry(cW * 0.32, cH * 0.82, 0.05), mats.steel);
      door.name = `container_${ci + 1}_door`;
      door.position.set(mesh.position.x + cW * 0.32, mesh.position.y, cD / 2 + 0.03);
      containers.add(door);
      const doorHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, cH * 0.6, 8), mats.cable);
      doorHandle.name = `container_${ci + 1}_handle`;
      doorHandle.rotation.z = Math.PI / 2;
      doorHandle.position.set(mesh.position.x + cW * 0.32 - cW * 0.14, mesh.position.y, cD / 2 + 0.07);
      containers.add(doorHandle);
      ci++;
    }
  }
  containers.position.set(9.5, 0, -3);
  root.add(containers);

  // second, shorter stack cluster for density (as in the reference photo)
  const containers2 = new THREE.Group();
  containers2.name = 'containersSecondary';
  const colorCycle2 = [mats.containerGray, mats.containerBlue, mats.containerRed, mats.containerGray];
  let ci2 = 0;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const mesh = new THREE.Mesh(boxGeo, colorCycle2[ci2 % colorCycle2.length]);
      mesh.name = `container2_${ci2 + 1}`;
      mesh.position.set(col * (cW + 0.15), row * (cH + 0.03) + cH / 2 + 0.001, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      containers2.add(mesh);
      ci2++;
    }
  }
  containers2.rotation.y = Math.PI / 2;
  containers2.position.set(-11.5, 0, -2);
  root.add(containers2);

  // ---- crane (safety-yellow RTG-style gantry) ----
  const crane = new THREE.Group();
  crane.name = 'gantryCrane';

  const legGeo = new THREE.CylinderGeometry(0.35, 0.4, 14, 20);
  const legPositions = [[-3.5, 7, -3.5], [3.5, 7, -3.5], [-3.5, 7, 3.5], [3.5, 7, 3.5]];
  legPositions.forEach((p, i) => {
    const leg = new THREE.Mesh(legGeo, mats.yellow);
    leg.name = `craneLeg_${i + 1}`;
    leg.position.set(p[0], p[1], p[2]);
    leg.castShadow = true;
    crane.add(leg);
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16), mats.steel);
    foot.name = `craneFoot_${i + 1}`;
    foot.position.set(p[0], 0.2, p[2]);
    foot.castShadow = true;
    crane.add(foot);
  });

  // spiral staircase climbing the front-right leg, like the reference photo
  const stairs = new THREE.Group();
  stairs.name = 'craneStaircase';
  const stepGeo = new THREE.BoxGeometry(0.9, 0.05, 0.32);
  const railGeo = new THREE.CylinderGeometry(0.02, 0.02, 14, 6);
  const stepCount = 34;
  const stairRadius = 0.62;
  for (let s = 0; s < stepCount; s++) {
    const angle = s * 0.55;
    const y = 0.4 + s * (13 / stepCount);
    const step = new THREE.Mesh(stepGeo, mats.steel);
    step.name = `stairStep_${s}`;
    step.position.set(3.5 + Math.cos(angle) * stairRadius, y, -3.5 + Math.sin(angle) * stairRadius);
    step.rotation.y = -angle;
    stairs.add(step);
  }
  const railOuter = new THREE.Mesh(railGeo, mats.yellowDark);
  railOuter.name = 'stairRail';
  railOuter.position.set(3.5 + stairRadius + 0.35, 7.4, -3.5);
  stairs.add(railOuter);
  crane.add(stairs);

  // X-braced lattice between legs (front/back faces + diagonal cross-bracing rungs)
  const braceGeo = new THREE.BoxGeometry(0.16, 9.4, 0.16);
  [-3.5, 3.5].forEach((x, i) => {
    const brace1 = new THREE.Mesh(braceGeo, mats.yellowDark);
    brace1.name = `craneBraceA_${i + 1}`;
    brace1.position.set(x, 7, 0);
    brace1.rotation.x = Math.PI / 2.6;
    crane.add(brace1);
    const brace2 = new THREE.Mesh(braceGeo, mats.yellowDark);
    brace2.name = `craneBraceB_${i + 1}`;
    brace2.position.set(x, 7, 0);
    brace2.rotation.x = -Math.PI / 2.6;
    crane.add(brace2);
  });
  const rungGeo = new THREE.BoxGeometry(7, 0.1, 0.1);
  for (let r = 0; r < 5; r++) {
    [-3.5, 3.5].forEach((x, i) => {
      const rung = new THREE.Mesh(rungGeo, mats.yellowDark);
      rung.name = `craneRung_${i + 1}_${r}`;
      rung.rotation.z = Math.PI / 2;
      rung.position.set(x, 2 + r * 2.6, 0);
      crane.add(rung);
    });
  }

  const deck = new THREE.Mesh(new THREE.BoxGeometry(9, 0.6, 8.6), mats.yellow);
  deck.name = 'craneDeck';
  deck.position.set(0, 14.3, 0);
  deck.castShadow = true;
  crane.add(deck);

  const boom = new THREE.Mesh(new THREE.BoxGeometry(20, 0.9, 1.1), mats.yellowDark);
  boom.name = 'craneBoom';
  boom.position.set(9.8, 15.2, 0);
  boom.castShadow = true;
  crane.add(boom);
  // lattice diagonals under the boom
  const diagGeo = new THREE.BoxGeometry(1.3, 0.08, 0.08);
  for (let d = 0; d < 7; d++) {
    const diag = new THREE.Mesh(diagGeo, mats.steel);
    diag.name = `boomLatticeDiag_${d}`;
    diag.rotation.z = d % 2 === 0 ? 0.7 : -0.7;
    diag.position.set(2 + d * 2.6, 14.7, 0);
    crane.add(diag);
  }

  const counterBoom = new THREE.Mesh(new THREE.BoxGeometry(7, 0.7, 1), mats.yellowDark);
  counterBoom.name = 'craneCounterBoom';
  counterBoom.position.set(-6.8, 15.2, 0);
  crane.add(counterBoom);

  const counterweight = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 2.6), mats.steel);
  counterweight.name = 'craneCounterweight';
  counterweight.position.set(-9.6, 14.4, 0);
  counterweight.castShadow = true;
  crane.add(counterweight);

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 6.2, 16), mats.yellow);
  mast.name = 'craneMast';
  mast.position.set(0.5, 17.6, 0);
  mast.rotation.z = -0.05;
  crane.add(mast);
  // stay cables from mast tip to boom tip and counterweight (reads as the A-frame rigging)
  const stayGeo = new THREE.CylinderGeometry(0.03, 0.03, 15, 6);
  const stay1 = new THREE.Mesh(stayGeo, mats.cable);
  stay1.name = 'stayCableFront';
  stay1.position.set(9, 17, 0);
  stay1.rotation.z = 1.28;
  crane.add(stay1);
  const stay2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 8, 6), mats.cable);
  stay2.name = 'stayCableBack';
  stay2.position.set(-4.5, 16.5, 0);
  stay2.rotation.z = -1.0;
  crane.add(stay2);

  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.8), mats.steel);
  cab.name = 'craneCab';
  cab.position.set(6.5, 14.0, 1.3);
  cab.castShadow = true;
  crane.add(cab);
  const cabWindow = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.05), mats.glass);
  cabWindow.name = 'craneCabWindow';
  cabWindow.position.set(6.5, 14.1, 2.23);
  crane.add(cabWindow);

  const trolley = new THREE.Group();
  trolley.name = 'craneTrolley';
  const trolleyBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.4), mats.steel);
  trolleyBody.name = 'trolleyBody';
  trolley.add(trolleyBody);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 8.5, 8), mats.cable);
  cable.name = 'hoistCable';
  cable.position.set(0, -4.5, 0);
  trolley.add(cable);
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.1, 8, 20, Math.PI * 1.4), mats.steel);
  hook.name = 'hoistHook';
  hook.position.set(0, -8.9, 0);
  hook.rotation.z = Math.PI;
  trolley.add(hook);
  trolley.position.set(6.2, 14.85, 0);
  crane.add(trolley);

  crane.position.set(-2, 0, 0);
  root.add(crane);

  // ---- delivery truck: red cab + teal trailer, parked under the boom ----
  const truck = new THREE.Group();
  truck.name = 'deliveryTruck';
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 9.5), mats.truckDark);
  chassis.name = 'truckChassis';
  chassis.position.set(0, 0.85, 0);
  truck.add(chassis);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.5, 1.7), mats.truckCab);
  cabin.name = 'truckCabin';
  cabin.position.set(0, 1.55, -4.2);
  cabin.castShadow = true;
  truck.add(cabin);
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 1.1), mats.truckCab);
  hood.name = 'truckHood';
  hood.position.set(0, 1.05, -5.4);
  truck.add(hood);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.6, 0.05), mats.glass);
  windshield.name = 'truckWindshield';
  windshield.position.set(0, 1.75, -3.4);
  windshield.rotation.x = 0.25;
  truck.add(windshield);
  const trailer = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 6.4), mats.truckTrailer);
  trailer.name = 'truckTrailer';
  trailer.position.set(0, 1.9, 1.5);
  trailer.castShadow = true;
  truck.add(trailer);
  const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.35, 20);
  const wheelZ = [-4.6, -2.6, 0.4, 1.6, 3.6];
  wheelZ.forEach((z, i) => {
    [-0.95, 0.95].forEach((x, j) => {
      const wheel = new THREE.Mesh(wheelGeo, mats.tire);
      wheel.name = `truckWheel_${i}_${j}`;
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, 0.42, z);
      wheel.castShadow = true;
      truck.add(wheel);
    });
  });
  truck.position.set(2.5, 0, 8);
  root.add(truck);

  root.userData.animate = (t) => {
    trolley.position.x = 6.2 + Math.sin(t * 0.15) * 3.4;
    hook.position.y = -8.9 + Math.sin(t * 0.6) * 0.15;
  };

  return root;
}
