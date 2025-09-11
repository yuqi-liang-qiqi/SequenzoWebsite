# Historical Data on the “Colonial Sequence” of Modern China

This dataset records, for the period **1840–1949**, the sovereignty status of 11 Chinese cities or regions at different points in time. It aims to reconstruct the historical “colonial sequence” of modern China. The data are organized as a time series: each row represents a city, and the “status” is the polity or country controlling that city in a given year.

The dataset has two categories:

1. **Permanently ceded territory**: areas that China ceded to a foreign power by treaty and that remained under that power’s sovereignty for an extended period.
2. **Leased territory**: areas that China leased to a foreign power for a fixed term, during which the lessee exercised de facto control.

Here, “status” denotes the sovereign controller of a city in a specific year—for example, **UK** for Britain, **Japan** for Japan, **Portugal** for Portugal, and **China** for China.

An example table is shown below:

| ID | Type                        | City             | 1840     | 1841     | 1842     | 1843     | 1844     | ... | 1945     | 1946     | 1947     | 1948     | 1949     |
| -- | --------------------------- | ---------------- | -------- | -------- | -------- | -------- | -------- | --- | -------- | -------- | -------- | -------- | -------- |
| 1  | Permanently ceded territory | Hong Kong Island | China    | China    | UK       | UK       | UK       | ... | China    | China    | China    | China    | China    |
| 2  | Permanently ceded territory | Macau            | Portugal | Portugal | Portugal | Portugal | Portugal | ... | Portugal | Portugal | Portugal | Portugal | Portugal |
| 3  | Permanently ceded territory | Taiwan           | China    | China    | China    | China    | China    | ... | Japan    | Japan    | Japan    | China    | China    |

For instance, the first row shows that Hong Kong Island came under British control after the Treaty of Nanking in 1842 and—according to this example—reverted to China after 1945.

> Translator’s note: Historically, British administration in Hong Kong was restored in 1945 after the Japanese occupation, and sovereignty did not transfer to China until **1997**. If the dataset encodes post-1945 “control” as “China” for Hong Kong Island, you may want to revisit that rule depending on your intended definition of “status”.

## How to load the data

You can load the dataset directly in Python:

```python
from sequenzo import *  # import the package
df = load_dataset('chinese_colonial_territories')
```

If you prefer to download the raw CSV file, visit the GitHub repository: [link](https://github.com/Liang-Team/Sequenzo/blob/main/sequenzo/datasets/chinese_colonial_territories.csv).

---

## Notes on key place names

### 1. Kowloon Peninsula (九龙半岛)

The Kowloon Peninsula is one of Hong Kong’s three major regions. It is bounded on three sides—east, south, and west—by Victoria Harbour. The east and west are densely populated industrial areas; the north is mainly residential; the south is a well-known commercial district. Together with Hong Kong Island across the harbour, Kowloon is an integral part of Hong Kong’s urban core.

In 1860, after the Qing court was defeated again by the Anglo-French forces in the Second Opium War, the Convention of Peking ceded the southern Kowloon Peninsula (together with Stonecutters Island) to the United Kingdom. The new boundary on the peninsula was demarcated near present-day Boundary Street with a low wire fence. In 1898, under the Convention for the Extension of Hong Kong Territory and related instruments, Britain leased northern Kowloon, the New Territories, and over 200 nearby islands for 99 years, excluding the Kowloon Walled City. In 1997, upon the expiry of the 99-year lease, the lease was canceled (租借取消) and sovereignty over the New Territories and northern Kowloon returned to China as part of the Hong Kong SAR.

### 2. Kwantung Leased Territory (Kantō-shū, 关东州)

The Kwantung Leased Territory occupied the southern tip of the Liaodong Peninsula from 1898 to 1945, including the strategically important ports of Lüshun (Port Arthur) and Dalian (Dairen). It was successively leased to Imperial Russia and then Japan. “Guandong/Guandongzhou” here means “east of Shanhai Pass” and is not the same as “Manchuria” in general usage.

The lease was established on 16 August 1899 after the Lü–Da Lease Convention between the Qing government and Russia, creating a leased area of roughly 3,200 km². The first administrator was Russian Vice Admiral Fyodor Dubasov, who also commanded the Kwantung Army and the Pacific Fleet. In February 1904, the Russo-Japanese War broke out; Russia capitulated at Lüshun in January 1905. In September 1905, Russia transferred the lease to Japan, making the Dalian area a Japanese colonial possession. Japan set up the Kwantung Governor-General’s Office to administer the territory.

### 3. New Territories (新界)

The New Territories are one of Hong Kong’s three main regions and the largest by area, with hilly terrain and Hong Kong’s highest peak, Tai Mo Shan (957 m). According to the 2010 Hong Kong Population Census, the New Territories had 3,343,046 residents, about 49.8% of Hong Kong’s population. The name dates to 9 June 1898, when the United Kingdom and the Qing court signed the Convention for the Extension of Hong Kong Territory in Beijing; the newly leased land lacked a uniform historical name and was referred to as the “new territory.”

### 4. Jiaozhou Bay / Kiautschou Bay (胶州湾)

Jiaozhou Bay (also historically Kiautschou Bay; ancient names Shaohai and Jiao’ao) lies on the south coast of the Shandong Peninsula along the Yellow Sea, within modern Qingdao. It is a semi-enclosed, roughly trumpet-shaped bay opening eastward, covering nearly 500 km², and is a high-quality natural harbour.

Named for the historical Jiaozhou jurisdiction, the bay area was seized by Germany in 1898 (citing the killing of missionaries), then occupied by Japan in 1914, and returned to the Republic of China in 1922. After 1949, administrative boundaries changed several times; by 1958 the bay area was under Qingdao municipal administration. As of 2012, adjacent districts included Shinan, Shibei, Licang, Chengyang, Jiaozhou, and Huangdao.

### 5. Weihaiwei (威海卫)

Weihaiwei sits at the northeastern tip of the Shandong Peninsula and served as a northern naval base and coastal defense post. Established as a wei (garrison) in the early Ming to counter wokou raids, it was later abolished in the Yongzheng era and reverted to Wendeng County. After the Sino-Japanese War of 1894–95, Japan occupied the area. In 1898, Britain leased Weihaiwei under the Convention for the Lease of Weihaiwei. In October 1930 (Republican Year 19), the ROC resumed administration and set up Weihaiwei as a special administrative district under the Executive Yuan. In 1938, Japan occupied it again; after Japan’s 1945 surrender, China recovered the territory.

Weihaiwei faces the open Yellow Sea, roughly equidistant (about 100 km) from Yantai and Qingdao. To the west it adjoins Ninghaizhou (modern Mouping). Together with Yantai and, across the Bohai Strait, Lüshun, it formed a strategic triangle guarding the maritime approaches to Beijing–Tianjin (roughly 1,000 li away).

### 6. Kouang-Tchéou-Wan / Guangzhouwan (广州湾; modern Zhanjiang)

Guangzhouwan (French: Kouang-Tchéou-Wan) is the former name for today’s Zhanjiang. It was a French leased territory (concession) in the late Qing and early Republic. The toponym likely derives from a village named “Guangzhouwan” on the Nansan Islands. A coastal city with a long history, Zhanjiang became the largest urban center in western Guangdong; proximity to the sea shaped its period of foreign rule in modern times.

In 1899, the urban area was leased by France under the name Guangzhouwan, and foreign trade flourished for a time. Japan occupied the territory in 1943. After Japan’s 1945 surrender, Guangzhouwan was returned; it has since been known as Zhanjiang.

### 7. Hong Kong Island (香港岛)

Hong Kong Island is the most densely developed part of Hong Kong. Although the island’s legal status evolved through multiple treaties, the 1997 handover covered the entire Hong Kong Special Administrative Region (island, Kowloon, and New Territories). Much of the island is mountainous, with peaks of 300–400 m; the highest point is Victoria Peak at 554 m. Many of today’s prime urban areas are built on reclaimed land. In a wider geographic sense, “Hong Kong Island” may include outlying islets such as Ap Lei Chau, Green Island(s), Kellett Island, and Yin Chau.

During the First Opium War (1839–1842), Britain defeated the Qing and in 1841 (the Convention of Chuenpi, not ratified) announced the cession of Hong Kong Island. The Treaty of Nanking (1842) then formally ceded the island to Britain as a Far Eastern colony. On 20 January 1841, British plenipotentiary Charles Elliot first occupied the island, landing at Possession Point and famously calling it a “barren rock.”

In the early 1930s, anticipating a possible Japanese attack and recognizing the military importance of Wong Nai Chung Gap, the British built extensive defenses: the Royal Artillery 5th AA battery, howitzer emplacements, and multiple pillboxes. On 8 December 1941, the Battle of Hong Kong began. Japanese forces made an amphibious landing at Causeway Bay on 18 December and reached Wong Nai Chung Gap on the 19th. British and Commonwealth units—including elements of the 3rd Volunteer Battalion, Scottish regiments, and The Winnipeg Grenadiers (D Company)—mounted a determined defense, reportedly inflicting over 600 casualties on the attackers. Nevertheless, the Japanese took the Gap on 23 December. With Wan Chai Gap also lost on the 24th, the defenders capitulated, ending the battle and initiating the Japanese occupation of Hong Kong.

---

## References for the colonial entries

Southern Kowloon Peninsula, Northern Kowloon Peninsula, Hong Kong Island, New Territories: Liu, Shuyong. Concise History of Hong Kong. Guangzhou: Guangdong People’s Publishing House, April 2019.

Taiwan, Kwantung Leased Territory, Jiaozhou Bay, Kouang-Tchéou-Wan, Weihaiwei: Zong, Min. Modern China in Treaties. Beijing: People’s Literature Publishing House, August 2018.

Manchuria: Wang, Qingxiang. Puyi and the Puppet Manchukuo. Beijing: People’s Publishing House, May 2015.

Hong Kong Island, Southern Kowloon Peninsula, New Territories, Northern Kowloon Peninsula: Liu, Shuyong. Concise History of Hong Kong. Guangzhou: Guangdong People’s Publishing House, April 2019.

Taiwan, Kwantung Leased Territory, Jiaozhou Bay, Kouang-Tchéou-Wan, Weihaiwei: Zong, Min. Modern China in Treaties. Beijing: People’s Literature Publishing House, August 2018.

Manchuria: Wang, Qingxiang. Puyi and the Puppet Manchukuo. Beijing: People’s Publishing House, May 2015.

---

*Authors: Jingrui Chen, Yuqi Liang*

*Translation: Yukun Ming*

*Edited by: Yuqi Liang*

