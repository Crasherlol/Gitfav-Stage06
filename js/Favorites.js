import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }
}

 

  

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onadd()
  }

  

  

  async add(username){
    
    try {
      const userExists = this.entries.find(entry => entry.login === username)

      if (userExists){
        throw new Error('Usuário ja cadastrado!')
      }

    



  const user = await GithubUser.search(username)
   console.log (user)
        if (user.login === undefined) {
          throw new Error('Usuário não encontrado!')
        }
        this.entries = [user, ...this.entries]
        this.update()
        this.save()
        

    }
      catch(error){
        alert (error.message)
      }
  }
    
  onadd(){
    const addButton = this.root.querySelector('.search')
    addButton.onclick = () => {
      const {value} = this.root.querySelector('.input-search')
      this.add(value)
    }
    
  
  }

  save(){
      localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
      
      
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    

  }
  delete(user){
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login
    )
    this.entries = filteredEntries
    
    this.update()
    this.save()
  }
  
  update (){
    this.revomeAllTr()
    
    this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user p').textContent = user.name 
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user span').textContent = `/${user.login}`
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers
      row.querySelector('.removeProfile').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar esse usuario?')
        if (isOk){
          this.delete(user)
        }
        
      }


      this.tbody.append(row)
    } )

      
  }
  createRow(){
    const tr = document.createElement('tr')

    tr.innerHTML = `
  
           <td class="user">
               <img src="assets/userImage.jpg"> <p> Mayk Brito</p> <a href="#" target="_blank"><br><span>/maykbrito</span></a>
           </td>

           <td class="repositories"> 
               <p> 72 </p>
           </td>

           <td class="followers">
               <p> 125029 </p>
           </td>

           <td class="ação">
              <a class="removeProfile" onclick=""> Remover </a>
           </td>
   `
      return tr
  }
  revomeAllTr(){

      this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }

}