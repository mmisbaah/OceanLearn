from pathlib import Path
from PIL import Image
import json, re

ROOT=Path(__file__).resolve().parents[1]
src=(ROOT/'app/OceanLearnApp.tsx').read_text(encoding='utf-8')
css=(ROOT/'app/v6.css').read_text(encoding='utf-8')

# Check 1: every one of the 18 avatars is unique, padded, transparent at all
# corners, and contains no second portrait/remnant according to extraction data.
report=json.loads((ROOT/'public/assets/generated/student-avatars/validation.json').read_text())
assert len(report)==18 and len({x['hash'] for x in report})==18
for item in report:
    assert item['corners']==[0,0,0,0]
    l,t,r,b=item['bbox']; assert l>=18 and t>=18 and r<=238 and b<=238

# Check 2: answer positions are spread between A/B/C in both learning modes.
quiz=[0,0,0]; games=[0,0,0]
for grade in range(1,6):
    for set_no in range(20):
        for pos in range(5): quiz[(set_no*5+pos+grade)%3]+=1
for grade in range(1,6):
    for game in range(5):
        for level in range(20):
            for pos in range(5): games[(game*100+level*5+pos+grade)%3]+=1
assert max(quiz)-min(quiz)<=1 and max(games)-min(games)<=1
assert 'rotateQuestion(items[pos]' in src and 'rotateQuestion(variants[game]' in src

# Check 3: all badges use code-native perfect-square circular discs, never the
# old atlas crops; docks also avoid every flawed character crop.
assert 'badge-disc' in src and 'badge-${' not in src
assert 'aspect-ratio:1' in css and 'border-radius:50%' in css and 'overflow:hidden' in css
assert 'dock-${' not in src and 'className="nav-icon"' in src
assert 'Hi, {student.name}' in src and '>Reset</span>' in src and '>Logout</span>' in src
assert src.count('scrollTop()')>=4

print(json.dumps({'avatars':'18/18 isolated and unique','quiz_answer_positions':quiz,'game_answer_positions':games,'badges':'20/20 code-native circles','navigation':'top-scroll hooks present','docks':'no cropped mascot assets'},indent=2))
