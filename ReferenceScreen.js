import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, ScrollView, Text, TextInput, Button, Image, Linking} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

class ReferenceScreen extends React.Component {
  
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }

  render() {
    const score = this.state.score;
    return (
      <View style = {styles.background}>
        <Image style={styles.imagine} source={require('./components/pic.png')}/>
        <Text style={styles.head}>Справка</Text>
        <Text style={styles.headcomment}>Оценка организации носит справочный характер. Данные из источников обновляются ежедневно.</Text>
        <Text style={styles.head}>Критерии оценки</Text> 
        <ScrollView>
        <Text style={styles.headtype}>Общая информация</Text> 
        <Text style={styles.headtext}>Адреса нескольких юл:</Text>
        <Text style={styles.usualtext}>Массовость адреса может свидетельствовать о существовании "фирмы однодневки".</Text>
        <Text style={styles.usualtext}>Под фирмой-однодневкой в самом общем смысле понимается юридическое лицо, не обладающее фактической самостоятельностью, созданное без цели ведения предпринимательской деятельности, как правило, не представляющее налоговую отчетность, зарегистрированное по адресу массовой регистрации и т.д.  {'\n'}</Text>
        <Text style={styles.headtext}>Возраст организации:</Text>
        <Text style={styles.usualtext}>Чем дольше компания существует, тем ниже вероятность того, что она окажется неблагонадежной.  {'\n'}Недавно зарегистрированные организации менее устойчивы к изменениям на рынке.  {'\n'}Также имеется риск сотрудничества с "фирмой-однодневкой".  {'\n'}Срок существования «фирм-однодневок» крайне мал — от одного года до двух лет, за который они успевают ликвидироваться до проведения необходимых проверок. {'\n'}</Text>
        <Text style={styles.headtext}>Статус:</Text>
        <Text style={styles.usualtext}>Позволяет отследить изменения статуса организации:</Text>
        <Text style={styles.usualtext}>1) Действующее</Text>
        <Text style={styles.usualtext}>2) Ликвидировано - прекращение ЮЛ без перехода в порядке универсального правопреемства его прав и обязанностей к другим лицам.</Text>
        <Text style={styles.usualtext}>3) Реорганизация - слияние, присоединение, разделение, выделение, преобразование ЮЛ. Может быть осуществлена по решению его учредителей (участников) или органа ЮЛ, уполномоченного на то учредительным документом.</Text>
        <Text style={styles.usualtext}>4) Банкротство - влечет ликвидацию ЮЛ. {'\n'}</Text>
        <Text style={styles.headtext}>Участие лица в нескольких юл</Text>
        <Text style={styles.usualtext}>Массовый учредитель — физическое лицо, которое является учредителем в большом количестве организаций. Может являться признаком фиктивной организации.</Text>
        <Text style={styles.usualtext}>По устоявшейся практике ФНС учредитель считается массовым, если физическое лицо является учредителем в более чем 5 организациях. {'\n'}</Text>
        <Text style={styles.headtext}>Дисквалификация</Text>
        <Text style={styles.usualtext}>Дисквалификация – это административное наказание гражданина в виде лишения его права осуществлять определенные виды профессиональной деятельности.{'\n'}В настоящее время полномочия по ведению и формированию Реестра возложены на Федеральную налоговую службу. {'\n'}</Text>
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_34661/393496c584137cc52c41c5fbbe7d66d5eaa40a63/`)}
           style={styles.link}>
         Ст. 3.11 КоАП РФ
        </Text> 
        <Text style={styles.headtype}>Судебное</Text> 
        <Text style={styles.headtext}>Дела в качестве истца</Text> 
        <Text style={styles.usualtext}>Болшое количество исков в качестве истца от количества всех судебных дел (больше 70 %) может свидетельствовать о риске недобросовестности компании при сотрудничестве. {'\n'}</Text>
        <Text style={styles.headtext}>Дела в качестве ответчика</Text>
        <Text style={styles.usualtext}>Множество исков к компании как к ответчику может говорить о постоянном нарушении обязательств перед контрагентами. {'\n'}Если общая сумма исков составляет 50-70 %,   70 % и выше от всех имеющихся средств организации, то компания с большей вероятностью не сможет в полной мере и в срок рассчитаться по своим обязательствам. {'\n'}</Text>
        <Text style={styles.headtype}>Задолженности</Text> 
        <Text style={styles.headtext}>Исполнительные производства</Text> 
        <Text style={styles.usualtext}>Если организация не погасила задолженность добровольно, суд принимает решение о принудительном взыскании.{'\n'}Наличие небольших штрафов является показателем реальной деятельности компании. Однако наличие крупных сумм исполнительных производств (65 % и выше от всех имеющихся средств компании) — это признак потенциально неблагонадежного контрагента.{'\n'}</Text>
        <Text style={styles.headtext}>Налоговая информация</Text>
        <Text style={styles.usualtext}>Сведения о превышающей 1000 рублей задолженности по уплате налогов - имеет/не имеет.</Text>
        <Text style={styles.usualtext}>Сведения о непредставлении налоговой отчетности более года - представляет/не представляет.Непредставление налоговой отчетности может указывать на фиктивность компании, т.е. реальная деятельность организации не соответствует заявленной и, возможно, вообще отсутствует.</Text>
        <Text style={styles.usualtext}>Сведения о суммах недоимки и задолженности по пеням и штрафам  - сумма налогов, сборов, страховых взносов, превышающая за период в пределах трех финансовых лет подряд 15 миллионов рублей указывает на уклонение от их в крупном размере, и, как следствие, на неблагонадежность контрагента.{'\n'}</Text>
        <Text onPress={() => Linking.openURL(`http://www.consultant.ru/document/cons_doc_LAW_10699/a53c2c91548ccb4f65ea933d514845a09be77ed5/`)}
           style={styles.link}>
         УК РФ Ст. 199
        </Text> 
        <Text style={styles.headtype}>Бухгалтерия</Text> 
        <Text style={styles.headtext}>Баланс.Прибыль.Выручка</Text>
        <Text style={styles.usualtext}>Полученные данные в виде баланса, прибыли и выручки позволяют сделать сразу несколько важных выводов о компании:{'\n'}1) подтверждает, что организация сдает отчетность{'\n'}2) позволяет установить, велась ли компанией хозяйственная деятельность{'\n'}3) дает информацию о «портфеле» средств, которыми располагает организация.</Text>
        <Text style={styles.headtext}>Важно!</Text>
        <Text style={styles.usualtext}>Слишком низкие по сравнению с суммой предполагаемой сделки обороты компании могут свидетельствовать о том, что компания укрывает часть доходов.{'\n'}Если один из показателей за сравнительным период понизился более, чем на 25%, то стоит задуматься о благонадежности контрагента.{'\n'}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#F8F8FF',
    height: '100%'
  },
  headtype:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headcomment: {
    fontSize: 14,
    textAlign: 'right'
  },
  headtext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'green'
  },
  usualtext: {
    fontSize: 18,
    marginLeft: 10
  },
  link: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  head: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  imagine: {
    //position: 'absolute',
    //width: '50%',
    //height: '50%',
    //justifyContent: 'center',
    //alignItems: 'center',
    width: '70%',
    height: '8%',
    alignSelf:'center'
  }

});
export default ReferenceScreen;
